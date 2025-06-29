export const checkCompatibility = (req, res) => {
  const components = req.body;
  const errors = [];

  /* 
    c_24 = socket
    c_27 = memory type (DDR3, DDR4, DDR5)
  */

  // !!!Нет возможности проверить совместимость размера материнской и системного блока ... разные значения тагов ... c_22, c_171!!!

  const ALLOWED_KEYS = {
    cpu: ["c_24"],
    motherboard: ["c_24", "c_27"],
    cooler: ["c_24"],
    ram: ["c_27"],
  };

  const dataByPartType = {};

  for (const partIdnt in components) {
    const tags = components[partIdnt];
    const componentName = tags[0]?.name || "Неизвестный компонент";

    tags.forEach(({ key, tagName, partType }) => {
      const type = partType?.toLowerCase();
      if (!ALLOWED_KEYS[type]?.includes(key)) return;

      if (!dataByPartType[type]) {
        dataByPartType[type] = {
          name: componentName,
        };
      }

      if (!dataByPartType[type][key]) {
        dataByPartType[type][key] = new Set();
      }

      dataByPartType[type][key].add(tagName);
    });
  }

  // Преобразуем множества в массивы
  for (const type in dataByPartType) {
    for (const key in dataByPartType[type]) {
      if (dataByPartType[type][key] instanceof Set) {
        dataByPartType[type][key] = [...dataByPartType[type][key]];
      }
    }
  }

  // названия апгрейдов
  const cpuName = dataByPartType.cpu?.name || "Процессор";
  const mbName = dataByPartType.motherboard?.name || "Материнская плата";
  const ramName = dataByPartType.ram?.name || "Оперативная память";
  const coolerName = dataByPartType.cooler?.name || "Охлаждение процессора";

  // сравнение сокетов CPU, CPU COOLER и MB
  const cpuSockets = dataByPartType.cpu?.c_24 || [];
  const mbSockets = dataByPartType.motherboard?.c_24 || [];
  const coolerSockets = dataByPartType.cooler?.c_24 || [];

  if (
    cpuSockets.length &&
    mbSockets.length &&
    !cpuSockets.some((s) => mbSockets.includes(s))
  ) {
    errors.push(`${cpuName}" ⛔ "${mbName}`);
  }

  if (
    cpuSockets.length &&
    coolerSockets.length &&
    !coolerSockets.some((s) => cpuSockets.includes(s))
  ) {
    errors.push(`${coolerName}" ⛔ "${cpuName}`);
  }

  // сравнение типов памяти MB и RAM
  const mbMemoryTypes = dataByPartType.motherboard?.c_27 || [];
  const ramMemoryTypes = dataByPartType.ram?.c_27 || [];

  if (
    mbMemoryTypes.length &&
    ramMemoryTypes.length &&
    !mbMemoryTypes.some((m) => ramMemoryTypes.includes(m))
  ) {
    errors.push(`${ramName}" ⛔ "${mbName}`);
  }

  res.json({
    compatible: errors.length === 0,
    errors,
  });
};
