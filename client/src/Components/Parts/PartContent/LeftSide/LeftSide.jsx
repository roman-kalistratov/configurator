import { memo, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFilter, setFilter } from '@/redux/slices/filtersStateSlice';
import { clearUpgrade } from '@/redux/slices/upgradesStateSlice';
import { selectedFiltersForPart } from '@/redux/selectors/filtersSelectors';
import FilterAccordion from './Components/FilterAccordion';
import MemoizedFilterCheckbox from './Components/FilterCheckbox';
import { FiltersContainer } from './styles';

const LeftSide = ({ filtersData }) => {
  const dispatch = useDispatch();
  const part = useSelector((state) => state.part.selectedPart);

  const selectedFilters = useSelector((state) =>
    selectedFiltersForPart(state, part.idnt),
  );

  // ✅ Стабильная функция, не вызывает dispatch внутри dispatch
  const handleCheckboxChange = useCallback(
    (tag, key, title, name, isChecked, partType) => {
      dispatch(clearUpgrade({ partIdnt: part.idnt }));

      if (isChecked) {
        dispatch(removeFilter({ partIdnt: part.idnt, tag }));
      } else {
        dispatch(
          setFilter({
            partIdnt: part.idnt,
            title,
            tag,
            key,
            tagName: name,
            ...(partType ? { partType } : {}),
          }),
        );
      }
    },
    [dispatch, part.idnt],
  );

  const filterGroups = useMemo(() => {
    const partType = filtersData.partType;

    return Object.entries(filtersData.filter).map(([key, group]) => {
      const { title, ...restFilters } = group;

      const filterList = Object.entries(restFilters).map(([tag, { name }]) => ({
        tag,
        name,
        title,
        key,
        ...(partType ? { partType } : {}),
      }));

      return {
        key,
        title,
        filters: filterList,
        ...(partType ? { partType } : {}),
      };
    });
  }, [filtersData]);

  return (
    <FiltersContainer>
      {filterGroups.map(({ key, title, filters }) => (
        <FilterAccordion key={key} title={title}>
          {filters.map(({ tag, name, partType }) => {
            const isChecked = selectedFilters.some((f) => f.tag === tag);

            return (
              <MemoizedFilterCheckbox
                key={tag}
                tag={tag}
                name={name}
                isChecked={isChecked}
                onChange={() =>
                  handleCheckboxChange(
                    tag,
                    key,
                    title,
                    name,
                    isChecked,
                    partType,
                  )
                }
                parentKey={key}
                parentTitle={title}
              />
            );
          })}
        </FilterAccordion>
      ))}
    </FiltersContainer>
  );
};

export default memo(LeftSide);
