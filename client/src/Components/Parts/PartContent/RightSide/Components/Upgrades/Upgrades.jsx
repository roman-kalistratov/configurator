import { useState, useEffect, useMemo } from 'react';
import { useGetItemsByPartQuery } from '@/redux/slices/api/upgradesApiSlice';
import { LinearProgress, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import UpgradeItem from './Components/UpgradeItem/UpgradeItem';
import { useGetFiltersByPartQuery } from '@/redux/slices/api/filtersApiSlice';
import { transformedFiltersForPart } from '@/redux/selectors/filtersSelectors';
import * as S from './styles';

const LIMIT = 15;

const Upgrades = ({ partidnt }) => {
  const theme = useTheme();

  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const viewTypeList = useSelector((state) => state.view.listView);

  const filters = useSelector((state) =>
    transformedFiltersForPart(state, partidnt),
  );

  // мемоизируем строку фильтров
  const filtersString = useMemo(() => JSON.stringify(filters), [filters]);

  // мемоизируем объект фильтров
  const memoizedFilters = useMemo(
    () => JSON.parse(filtersString),
    [filtersString],
  );

  // ✅ Автоматический запрос с кэшированием
  const { data, isFetching, isError } = useGetItemsByPartQuery(
    { partIdnt: partidnt, limit: LIMIT, offset, filters: memoizedFilters },
    {
      skip: !partidnt,
    },
  );

  // Сброс при смене partIdnt или фильтров
  useEffect(() => {
    setOffset(0);
    setItems([]);
    setHasMore(true);
    setInitialLoaded(false);
  }, [partidnt, filtersString]);

  // Обновляем items — ЗАМЕНЯЕМ, если offset === 0, иначе добавляем
  useEffect(() => {
    if (!data) return;

    if (offset === 0) {
      setItems(data);
    } else {
      setItems((prev) => {
        const existingUins = new Set(prev.map((i) => i.uin));
        const newItems = data.filter((i) => !existingUins.has(i.uin));
        return [...prev, ...newItems];
      });
    }

    setInitialLoaded(true);
    if (data.length < LIMIT) {
      setHasMore(false);
    }
  }, [data, offset]);

  // Следующая порция данных
  const fetchMoreData = () => {
    if (isFetching || !hasMore) return;
    setOffset((prev) => prev + LIMIT);
  };

  // Получает uin (уникальный ID) выбранного upgrade (апгрейда) для текущей комплектующей (part.idnt)
  const selectedUin = useSelector(
    (state) => state.upgrades.selectedUpgrades[partidnt]?.uin,
  );

  // Получение allFiltersByPart (все доступные фильтры) из кеша (без нового запроса)
  const { filter: allFiltersForPart = [] } = useGetFiltersByPartQuery(
    partidnt,
    {
      skip: !partidnt,
      selectFromResult: useMemo(
        () =>
          ({ data }) => ({
            filter: data?.filter || [],
          }),
        [],
      ),
    },
  );

  // Ошибка загрузки
  if (isError) {
    return (
      <S.UpgradesContainer>
        <Typography variant="body1">Ошибка загрузки данных upgrades</Typography>
      </S.UpgradesContainer>
    );
  }

  // Нет данных (после полной загрузки)
  if (!isFetching && initialLoaded && items.length === 0) {
    return (
      <S.UpgradesContainer>
        <Typography variant="body1">Upgrades not found</Typography>
      </S.UpgradesContainer>
    );
  }

  return (
    <S.UpgradesContainer id="scrollableUpgrades">
      {isFetching && offset === 0 && (
        <S.LoadingWrapper>
          <LinearProgress
            variant="indeterminate"
            sx={{
              height: 3,
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette.primary.light,
                transition: 'none',
              },
            }}
          />
        </S.LoadingWrapper>
      )}

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        scrollableTarget="scrollableUpgrades"
      >
        <S.UpgradesWrapper viewTypeList={viewTypeList}>
          {items.map((item) => (
            <UpgradeItem
              key={item.uin}
              uin={item.uin}
              name={item.name}
              price={item.price}
              img={item.image_lrg}
              tags={item.tags}
              url={item.url}
              partType={item.partType}
              partIdnt={partidnt}
              isSelected={selectedUin === item.uin}
              allFiltersForPart={allFiltersForPart}
              viewTypeList={viewTypeList}
            />
          ))}
        </S.UpgradesWrapper>
      </InfiniteScroll>
    </S.UpgradesContainer>
  );
};

export default Upgrades;
