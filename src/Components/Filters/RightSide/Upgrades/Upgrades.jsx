import { useSelector } from "react-redux";
import { useMemo } from "react";
import { UpgradesContainer } from "./styles";
import UpgradeItem from "./UpgradeItem/UpgradeItem";

const Upgrades = () => {
  const partItems = useSelector((state) => state.filters.partItems);
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);

  const filteredPartItems = useMemo(() => {
    if (selectedFilters.length === 0) {
      return Object.values(partItems);
    }

    const selectedTags = selectedFilters.map((filter) => filter.tag);

    return Object.values(partItems).filter((item) => {
      if (!item.tags || typeof item.tags !== "object") return false;

      const allItemTags = new Set(Object.values(item.tags).flat());
      return selectedTags.every((tag) => allItemTags.has(tag));
    });
  }, [partItems, selectedFilters]);

  return (
    <UpgradesContainer>
      {filteredPartItems.length === 0 ? (
        <p>No items found matching the selected filters.</p>
      ) : (
        filteredPartItems.map((item) => (
          <UpgradeItem key={item.uin} item={item} />
        ))
      )}
    </UpgradesContainer>
  );
};

export default Upgrades;
