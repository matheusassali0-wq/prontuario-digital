const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/api/v1/health", async (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.get("/api/v1/data", async (req, res) => {
  const data = await prisma.yourModel.findMany(); // Replace 'yourModel' with your actual model name
  res.json(data);
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
