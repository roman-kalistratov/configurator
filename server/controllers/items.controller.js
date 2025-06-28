import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getItemsByPart = (req, res) => {
  const partIdnt = req.params.partIdnt;
  const queryFilters = req.query;

  const itemsPath = path.join(__dirname, "../data/itemsByPart.json");
  const imagesPath = path.join(__dirname, "../data/itemsImg.json");

  try {
    const itemsData = JSON.parse(fs.readFileSync(itemsPath, "utf8"));
    const imagesData = JSON.parse(fs.readFileSync(imagesPath, "utf8"));

    if (!itemsData[partIdnt]) {
      return res.status(404).json({ error: `PartIdnt ${partIdnt} not found` });
    }

    let items = Object.values(itemsData[partIdnt].items);

    // Извлекаем limit и offset из query
    const limit = parseInt(queryFilters.limit, 10);
    const offset = parseInt(queryFilters.offset, 10) || 0;

    // Удаляем служебные параметры limit и offset из фильтров
    delete queryFilters.limit;
    delete queryFilters.offset;

    // Преобразование фильтров вида c_4=68996 в {"4": ["68996", "68997"]}
    const normalizedFilters = {};
    for (const key in queryFilters) {
      const cleanKey = key.startsWith("c_") ? key.slice(2) : key;
      if (!normalizedFilters[cleanKey]) {
        normalizedFilters[cleanKey] = [];
      }
      normalizedFilters[cleanKey] = normalizedFilters[cleanKey].concat(
        Array.isArray(queryFilters[key])
          ? queryFilters[key]
          : [queryFilters[key]]
      );
    }

    // Фильтрация товаров по тегам
    items = items.filter((item) => {
      const itemTags = item.tags || {};
      return Object.entries(normalizedFilters).every(([tagKey, tagValues]) =>
        tagValues.some((val) => itemTags[tagKey]?.includes(val))
      );
    });

    // Сортировка по цене (по возрастанию)
    items.sort((a, b) => {
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;
      return priceA - priceB;
    });

    // Создание карты изображений по uin
    const imageMap = Object.fromEntries(
      imagesData.map(({ uin, image, image_lrg }) => [uin, { image, image_lrg }])
    );

    const partType = itemsData[partIdnt].partType;

    // Добавление изображений к товарам
    const enrichedItems = items.map((item) => {
      const imageData = imageMap[item.uin];
      return {
        ...item,
        ...(imageData ? imageData : {}),
        ...(partType ? { partType } : {}),
      };
    });

    // Применение offset и limit
    const pagedItems = isNaN(limit)
      ? enrichedItems.slice(offset)
      : enrichedItems.slice(offset, offset + limit);

    res.json(pagedItems);
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
