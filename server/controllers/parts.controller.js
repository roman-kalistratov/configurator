import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Эмуляция __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getParts = (req, res) => {
  const filePath = path.join(__dirname, "../data/parts.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      return res.status(500).json({ error: "Ошибка сервера" });
    }

    try {
      const response = JSON.parse(data);
      res.json(response.parts);
    } catch (parseErr) {
      console.error("Ошибка парсинга JSON:", parseErr);
      res.status(500).json({ error: "Неверный формат JSON" });
    }
  });
};
