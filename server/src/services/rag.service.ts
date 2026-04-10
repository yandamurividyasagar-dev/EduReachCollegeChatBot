import path from "node:path";
import { fileURLToPath } from "node:url";
import { MongoClient, Collection } from "mongodb";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import Groq from "groq-sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mongoClient: MongoClient;
let knowledgeCollection: Collection;
let groq: Groq;
let chunks: string[] = [];

export const initializeKnowledgeBase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) throw new Error("MONGODB_URI is not defined");

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) throw new Error("GROQ_API_KEY is not defined");

    groq = new Groq({ apiKey: groqApiKey });

    mongoClient = new MongoClient(mongoURI);
    await mongoClient.connect();

    const db = mongoClient.db("edureach_chatbot");
    knowledgeCollection = db.collection("knowledge_base");

    const count = await knowledgeCollection.countDocuments();
    if (count > 0) {
      console.log(" Knowledge base already initialized, loading chunks...");
      const docs = await knowledgeCollection.find({}).toArray();
      chunks = docs.map((d) => d.text);
    } else {
      console.log("⏳ Initializing knowledge base...");

      const knowledgePath = path.join(
        __dirname,
        "../../knowledge-base/edureach-knowledge.txt"
      );
      const loader = new TextLoader(knowledgePath);
      const docs = await loader.load();

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const splitDocs = await textSplitter.splitDocuments(docs);
      chunks = splitDocs.map((d) => d.pageContent);

      await knowledgeCollection.insertMany(
        chunks.map((text) => ({ text }))
      );
      console.log(` Added ${chunks.length} chunks to knowledge base`);
    }

  } catch (error) {
    console.error(" Error initializing knowledge base:", error);
    throw error;
  }
};

export const getRAGResponse = async (query: string): Promise<string> => {
  try {
    if (!chunks.length) throw new Error("Knowledge base not initialized");

    // Step 1: Use Groq to find relevant chunk indices
    const selectionResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Given this question: "${query}"

From the following chunks, pick the 3 most relevant ones and return ONLY their numbers separated by commas (e.g. "1,5,12"). Nothing else.

${chunks.map((c, i) => `[${i}] ${c.substring(0, 200)}`).join("\n\n")}`,
        },
      ],
      temperature: 0,
      max_tokens: 20,
    });

    const selectionText = selectionResponse.choices[0]?.message?.content ?? "";
    const indices = selectionText
      .match(/\d+/g)
      ?.map(Number)
      .filter((n) => n < chunks.length)
      .slice(0, 3) ?? [0, 1, 2];

    const context = indices.map((i) => chunks[i]).join("\n\n");

    // Step 2: Use Groq to generate the answer
    const answerResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for EduReach College. Use the following context to answer accurately. If the answer is not in the context, say you don't have that information.

Context:
${context}`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    return answerResponse.choices[0]?.message?.content ?? "Sorry, I could not generate a response.";

  } catch (error) {
    console.error(" Error getting RAG response:", error);
    const message = error instanceof Error ? error.message : String(error);
    return `I'm sorry, I encountered an error while processing your question. (${message})`;
  }
};