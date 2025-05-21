import items from '../../../../items.json';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { UpgradesContainer } from './styles';
import UpgradeItem from './UpgradeItem/UpgradeItem';
import ItemsSkeleteon from '@/Components/Skeleton/ItemsSkeleteon';
import { setLoading } from '@/redux/slices/loadingStateSlice';

const Upgrades = () => {
  const dispatch = useDispatch();
  const part = useSelector((state) => state.filters.part);
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const selectedUpgrades = useSelector(
    (state) => state.filters.selectedUpgrades
  );

  const isItemsLoading = false;

  // Все товары для текущего part
  const partItems = useMemo(() => {
    return Object.values(items[part.idnt]?.items || {});
  }, [part.idnt]);

  // 🔹 Только фильтры, относящиеся к текущему part
  const relevantSelectedFilters = useMemo(
    () => selectedFilters.filter((f) => f.partIdnt === part.idnt),
    [selectedFilters, part.idnt]
  );

  // 🔹 Фильтрация товаров
  const filteredPartItems = useMemo(() => {
    const sortByPrice = (a, b) => Number(a.price) - Number(b.price);

    const itemsWithPartIdnt = relevantSelectedFilters.length
      ? partItems
          .filter((item) => {
            const filterMap = relevantSelectedFilters.reduce((acc, filter) => {
              const parentKey = filter.parent?.replace('c_', '');
              if (!acc[parentKey]) acc[parentKey] = new Set();
              acc[parentKey].add(filter.tag);
              return acc;
            }, {});
            return Object.entries(filterMap).every(([parent, tagSet]) => {
              const itemTags = item.tags?.[parent] || [];
              return itemTags.some((tag) => tagSet.has(tag));
            });
          })
          .sort(sortByPrice)
      : [...partItems].sort(sortByPrice);

    return itemsWithPartIdnt.map((item) => ({ ...item, partIdnt: part.idnt }));
  }, [partItems, relevantSelectedFilters, part.idnt]);

  // 🔹 Эмуляция загрузки при смене part
  const startLoading = useCallback(() => {
    dispatch(setLoading({ type: 'items', value: true }));
    const timer = setTimeout(() => {
      dispatch(setLoading({ type: 'items', value: false }));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    startLoading();
    return startLoading;
  }, [part.idnt, startLoading]); // Только на смену part!

  return (
    <UpgradesContainer>
      {isItemsLoading ? (
        <ItemsSkeleteon />
      ) : filteredPartItems.length === 0 ? (
        <p>No items found matching the selected filters.</p>
      ) : (
        filteredPartItems.map((item) => {
          const existingUpgrade = selectedUpgrades.find(
            (upg) => upg.partIdnt === item.partIdnt
          );

          let priceDifference = null;
          if (existingUpgrade && existingUpgrade.uin !== item.uin) {
            const diff = Number(item.price) - Number(existingUpgrade.price);
            if (diff !== 0) {
              priceDifference = diff > 0 ? `+₪${diff}` : `-₪${Math.abs(diff)}`;
            }
          }

          return (
            <UpgradeItem
              key={item.uin}
              item={item}
              priceDifference={priceDifference}
            />
          );
        })
      )}
    </UpgradesContainer>
  );
};
export default Upgrades;
