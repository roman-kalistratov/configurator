import { setFilter } from "@/redux/slices/filtersStateSlice";
import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterAccordion from "./FilterAccordion";
import FilterCheckbox from "./FilterCheckbox";
import { FiltersContainer } from "./styles";

const LeftSide = () => {
  const filtersByPart = useSelector((state) => state.filters.filters);
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const dispatch = useDispatch();

  // Создаем Set для быстрого поиска
  const selectedFilterTags = useMemo(() => {
    return new Set(selectedFilters.map((filter) => filter.tag));
  }, [selectedFilters]);

  // Количество выбранных фильтров на категорию
  const selectedCounts = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filtersByPart).map(([key, { filters }]) => [
        key,
        filters.reduce(
          (count, filter) =>
            selectedFilterTags.has(filter.tag) ? count + 1 : count,
          0
        ),
      ])
    );
  }, [filtersByPart, selectedFilterTags]);

  const handleCheckboxChange = useCallback(
    (tag, key, title) => {
      const filter = filtersByPart[key].filters.find((f) => f.tag === tag);
      if (filter) {
        dispatch(setFilter({ ...filter, parent: key, parentName: title }));
      }
    },
    [dispatch, filtersByPart]
  );

  return (
    <FiltersContainer>
      {Object.entries(filtersByPart).map(([key, { title, filters }]) => (
        <FilterAccordion
          key={key}
          title={title}
          selectedCount={selectedCounts[key]}
        >
          {filters.map((filter) => (
            <MemoizedFilterCheckbox
              key={filter.tag}
              tag={filter.tag}
              name={filter.name}
              isChecked={selectedFilterTags.has(filter.tag)}
              onChange={handleCheckboxChange}
              parentKey={key}
              parentTitle={title}
            />
          ))}
        </FilterAccordion>
      ))}
    </FiltersContainer>
  );
};

// Передаем **примитивные** пропсы вместо объекта `filter`
const MemoizedFilterCheckbox = memo(FilterCheckbox);

export default LeftSide;
