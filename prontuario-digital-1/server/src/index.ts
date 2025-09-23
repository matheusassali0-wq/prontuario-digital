import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/api/v1/health", async (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/v1/items", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post("/api/v1/items", async (req, res) => {
  const { name } = req.body;
  const newItem = await prisma.item.create({ data: { name } });
  res.status(201).json(newItem);
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
