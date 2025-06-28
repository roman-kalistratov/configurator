import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Эмуляция __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getFiltersByPart = (req, res) => {
  const partIdnt = req.params.partIdnt;

  const filePath = path.join(__dirname, "../data/filtersByPart.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      return res.status(500).json({ error: "Ошибка сервера" });
    }

    try {
      const response = JSON.parse(data);
      const filtersData = response.filters;

      if (!filtersData || !filtersData[partIdnt]) {
        return res
          .status(404)
          .json({ error: `Данные для partIdnt ${partIdnt} не найдены` });
      }

      res.json(filtersData[partIdnt]);
    } catch (parseErr) {
      console.error("Ошибка парсинга JSON:", parseErr);
      res.status(500).json({ error: "Неверный формат JSON" });
    }
  });
};
