export const checkCompatibility = (req, res) => {
  const components = req.body;
  const errors = [];

  const ALLOWED_KEYS = {
    cpu: ["c_24"],
    motherboard: ["c_24"],
  };

  // Собираем данные по типам: для каждого типа сохраним { key: tagName, name: string }
  const dataByPartType = {};

  for (const partIdnt in components) {
    const tags = components[partIdnt];

    // Предполагаем, что имя компонента одинаково для всех тегов внутри partIdnt
    // Поэтому возьмём имя из первого объекта
    const componentName = tags[0]?.name || "Неизвестный компонент";

    tags.forEach(({ key, tagName, partType }) => {
      const type = partType?.toLowerCase();
      if (!ALLOWED_KEYS[type]?.includes(key)) return;

      if (!dataByPartType[type]) {
        dataByPartType[type] = {};
      }

      dataByPartType[type][key] = tagName;
      dataByPartType[type].name = componentName;
    });
  }

  // Cравнение сокет CPU и сокет Motherboard
  const cpuSocket = dataByPartType.cpu?.c_24;
  const mbSocket = dataByPartType.motherboard?.c_24;

  const cpuName = dataByPartType.cpu?.name || "Процессор";
  const mbName = dataByPartType.motherboard?.name || "Материнская плата";

  if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
    errors.push(`${cpuName}" - "${mbName}`);
  }

  res.json({
    compatible: errors.length === 0,
    errors,
  });
};
