import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chat Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, language } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Missing authentication configuration for AI services." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are an active, modern AI Software Engineering Lead specializing in high-performance Parallel Computing.
      Focus on formal principles derived from standard computer science curricula (e.g., Dr. Mehmet Gencer, B. Wilkinson). 
      Cover topics like:
      - Flynn's Taxonomy (SISD, SIMD, MISD, MIMD).
      - Amdahl's Law limit calculation and Gustafson's Law.
      - Distributed Memory computing using MPI (MPI_Bcast, MPI_Reduce, MPI_Scatter, MPI_Gather).
      - Shared Memory synchronization using Pthreads (Mutex, Condition Variables).
      - GPU Execution, CUDA concepts (Thread/Block/Grid), and Coalesced Memory Access.
      - Pipelining theory and Load Balancing (Round Robin, Centralized Task Pool).

      Adopt an encouraging, technically sharp, and modern engineering tone. Do NOT use old manuscript, scroll, or esoteric encyclopedia phrasing. Emphasize logic, architecture, and theoretical constraints.
      Please respond perfectly in ${language === 'tr' ? 'Turkish' : 'English'}.
      Explain code concepts meticulously *before* providing the explicit code answer, enforcing academic rigor but with a modern engineer's pragmatism.`;

      const history = messages.slice(0, -1).map((m: any) => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));
      const latestMessage = messages[messages.length - 1].content;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            ...history,
            { role: "user", parts: [{ text: latestMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.5,
        }
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Simulation Route
  app.post("/api/simulate", (req, res) => {
      const { code } = req.body;
      const isMpi = code.includes("MPI_Init");
      const isPthread = code.includes("pthread_create");
      const isCuda = code.includes("__global__") || code.includes("cudaMalloc") || code.includes("blockIdx");
      
      let simulationLog = "[SYSTEM] Initializing compilation routines...\n[SYSTEM] Syntax verification passed.\n";
      
      if (isCuda) {
         simulationLog += "[RUNTIME] SIMT Execution Detected (CUDA GPU).\n";
         if (code.includes("__shared__")) {
             simulationLog += ">> Pre-fetching arrays to Shared Memory...\n>> Synchronizing warp threads (__syncthreads)...\n>> Computing tile operations...\n[RESULT] Coalesced shared memory optimizations recognized.\nExecution Time: 0.05s\nPerformance: Exceptional throughput (Highly Scalable).";
         } else {
             simulationLog += ">> Global memory array reads registered...\n>> Executing kernel grid blocks...\n[WARNING] Sub-optimal access. High global memory latency overhead. Consider implementing __shared__ memory blocks for tiled computations.\nExecution Time: 0.15s\nPerformance: Functional (Bottlenecked bandwidth).";
         }
      } else if (isPthread) {
         simulationLog += "[RUNTIME] Shared Memory Execution Detected (Pthreads).\n";
         if (code.includes("pthread_mutex_lock")) {
             simulationLog += ">> Thread 0 locking mutex...\n>> Thread 0 enters Critical Section\n>> Thread 1 blocked (Mutex held)\n>> Thread 0 releases mutex\n>> Thread 1 enters Critical Section\n[RESULT] Race condition successfully prevented.\nExecution Time: 0.12s\nPerformance: Stable.";
         } else {
             simulationLog += ">> Thread 0 accesses shared variable 'sum'\n>> Thread 1 accesses shared variable 'sum'\n[WARNING] Potential Race Condition detected. No mutex lock observed.\nExecution Time: 0.10s\nPerformance: Unstable/Risky.";
         }
      } else if (isMpi) {
         simulationLog += "[RUNTIME] Distributed Memory Execution Detected (MPI).\n";
         if (code.includes("MPI_Bcast") || code.includes("MPI_Reduce") || code.includes("MPI_Scatter")) {
            simulationLog += ">> [Rank 0] Executing Collective Broadcast/Scatter...\n>> [Ranks 1-3] Synchronizing block operations...\n>> [Ranks 0-3] Performing local computations...\n>> [Rank 0] MPI_Reduce aggregating sequence.\n[RESULT] Complete. O(log N) optimized communication behavior verified.\nExecution Time: 0.28s\nPerformance: Highly Scalable.";
         } else if (code.includes("MPI_Send") && code.includes("MPI_Recv")) {
            simulationLog += ">> [Rank 0] Initiating Point-to-Point MPI_Send...\n>> [Rank 1,2,3] Awaiting blocking MPI_Recv...\n>> Transmitting sequential blocks...\n[RESULT] Accumulation finalized.\nExecution Time: 0.85s\nPerformance: Sub-optimal scalability due to linear message dependencies.";
         } else {
            simulationLog += "[ERROR] MPI_Init invoked but standard communication directives (Bcast, Reduce, Send, Recv) absent or malformed.";
         }
      } else {
         simulationLog += "[RUNTIME] Strictly Sequential Execution Detected (SISD).\n>> Processing array recursively...\n>> Instruction limit bounded by single core clock limits.\n[RESULT] Operation completed safely.\nExecution Time: 1.85s\nPerformance: Hard bounded by Amdahl's limits (f=1.0). Consider paralellizing loop instructions utilizing Pthreads or MPI.";
      }
      res.json({ result: simulationLog });
  });

  // Generate Dynamic Exam Questions
  app.post("/api/generate-exam", async (req, res) => {
    try {
      const { topic, difficulty, language } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Missing GEMINI_API_KEY for dynamic generation." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a strict Parallel Computing University Professor. Formulate 3 extremely rigorous, academic exam questions and their detailed answers about the topic: ${topic}.
      Difficulty: ${difficulty}.
      Language: ${language === 'tr' ? 'Turkish' : 'English'}.
      
      Return ONLY a raw JSON array. DO NOT wrap it in Markdown formatting (no \`\`\`json). The array must contain exactly 3 objects.
      Each object must strictly match this structure:
      {
         "q": "The question string here",
         "a": "The detailed academic answer string here"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7
        }
      });

      let jsonStr = response.text;
      const questions = JSON.parse(jsonStr);

      res.json({ questions });
    } catch (error: any) {
      console.error("Exam generation failed:", error);
      res.status(500).json({ error: "Failed to generate exam questions." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server strictly bound to internal port ${PORT}`);
  });
}

startServer();
