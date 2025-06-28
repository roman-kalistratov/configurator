import { useEffect, useState, useRef } from 'react';
import { useCheckCompatibilityMutation } from '@/redux/slices/api/compatibilityApiSlice';

export const useCompatibilityCheck = (selectedUpgrades) => {
  const [compatibilityErrors, setCompatibilityErrors] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [checkCompatibility] = useCheckCompatibilityMutation();
  const debounceRef = useRef(null);

  const prepareDataToSend = (upgrades) => {
    const result = {};
    Object.entries(upgrades).forEach(([partIdnt, upgrade]) => {
      if (!upgrade || !upgrade.tags) return;
      const tagsArray = [];
      for (const [key, tags] of Object.entries(upgrade.tags)) {
        tags.forEach((tag) => {
          tagsArray.push({
            title: '',
            tag,
            key: `c_${key}`,
            tagName: tag,
            partType: upgrade.partType.toLowerCase(),
            name: upgrade.name,
          });
        });
      }
      result[partIdnt] = tagsArray;
    });
    return result;
  };

  useEffect(() => {
    if (!selectedUpgrades || Object.keys(selectedUpgrades).length === 0) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const dataToSend = prepareDataToSend(selectedUpgrades);

      checkCompatibility(dataToSend)
        .unwrap()
        .then((data) => {
          setCompatibilityErrors(data.errors || []);
          setOpenModal(!data.compatible);
        })
        .catch(console.error);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [checkCompatibility, selectedUpgrades]);

  return { compatibilityErrors, openModal, setOpenModal };
};
