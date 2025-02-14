import { setFilter } from "@/redux/slices/filtersStateSlice"
import { useDispatch, useSelector } from "react-redux"
import FilterAccordion from "./FilterAccordion"
import FilterCheckbox from "./FilterCheckbox"
import { FiltersContainer } from "./styles"

const LeftSide = () => {
  const filtersByPart = useSelector((state) => state.filters.filters)
  const selectedFilters = useSelector((state) => state.filters.selectedFilters)
  const dispatch = useDispatch()

  const handleCheckboxChange = (filter, key, title) => {
    const filterWithParent = {
      ...filter,
      parent: key,
      parentName: title,
    }

    dispatch(setFilter(filterWithParent))
  }

  return (
    <FiltersContainer>
      {Object.entries(filtersByPart).map(([key, { title, filters }]) => {
        const selectedCount = selectedFilters.filter((selectedFilter) =>
          filters.some((filter) => filter.tag === selectedFilter.tag)
        ).length

        return (
          <FilterAccordion
            key={key}
            title={title}
            selectedCount={selectedCount}
          >
            {filters.map((filter, index) => (
              <FilterCheckbox
                key={index}
                filter={filter}
                isChecked={selectedFilters.some(
                  (selectedFilter) => selectedFilter.tag === filter.tag
                )}
                onChange={() => handleCheckboxChange(filter, key, title)}
              />
            ))}
          </FilterAccordion>
        )
      })}
    </FiltersContainer>
  )
}

export default LeftSide
