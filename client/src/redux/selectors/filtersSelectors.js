import { createSelector } from 'reselect';

// Получение выбранных фильтров для всех parts
export const selectFiltersByPart = (state) =>
  state.filters.selectedFiltersByPart;

// выбранный partIdnt
export const selectPartIdnt = (_, partIdnt) => partIdnt;

// Получение выбранных фильтров для конкретной partIdnt
export const selectedFiltersForPart = createSelector(
  [selectFiltersByPart, selectPartIdnt],
  (filtersByPart, partIdnt) => filtersByPart[partIdnt] || [],
);

// Преобразуем в объект для API-запросов: { c_4: [68993, 68996], ... }
export const transformedFiltersForPart = createSelector(
  [selectedFiltersForPart],
  (selectedFilters) =>
    selectedFilters.reduce((acc, { key, tag }) => {
      acc[key] = acc[key] || [];
      acc[key].push(tag);
      return acc;
    }, {}),
);
