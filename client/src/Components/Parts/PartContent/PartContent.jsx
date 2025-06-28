import { useGetFiltersByPartQuery } from '@/redux/slices/api/filtersApiSlice';
import FiltersSkeleton from '../../Skeleton/FiltersSkeleton';
import { Stack } from '@mui/material';
import LeftSide from './LeftSide/LeftSide';
import RightSide from './RightSide/RightSide';

const PartContent = ({ partIdnt }) => {
  const {
    data: filtersData,
    isError: filtersError,
    isFetching,
    isLoading: filtersLoading,
  } = useGetFiltersByPartQuery(partIdnt);

  console.log('%c[RENDER] PartContent', 'color: green');

  if (filtersLoading || isFetching) return <FiltersSkeleton />;

  if (filtersError) return <div>Ошибка загрузки</div>;

  return (
    <Stack direction="row" spacing={3} height="100%">
      <LeftSide filtersData={filtersData} />
      <RightSide />
    </Stack>
  );
};

export default PartContent;
