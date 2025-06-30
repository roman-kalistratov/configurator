import { useSelector } from 'react-redux';
import { useGetPartsQuery } from '@/redux/slices/api/partsApiSlice';
import PageSkeleton from '../Skeleton/PageSkeleton';
import PartItem from './PartItem/PartItem';
import { useCompatibilityCheck } from '../../hooks/useCompatibilityCheck';
import CompatibilityDrawer from '../Drawer/CompatibilityDrawer';

const Parts = () => {
  const { data: parts, isError, isLoading } = useGetPartsQuery();

  const selectedPart = useSelector((state) => state.part.selectedPart);
  const selectedUpgrades = useSelector(
    (state) => state.upgrades.selectedUpgrades,
  );

  const { compatibilityErrors, openModal, setOpenModal } =
    useCompatibilityCheck(selectedUpgrades);

  if (isLoading) return <PageSkeleton />;
  if (isError) return <div>Ошибка загрузки</div>;

  console.log('render parts');

  return (
    <>
      {parts?.map((part) => (
        <PartItem
          key={part.idnt}
          part={part}
          isSelected={selectedPart?.idnt === part?.idnt}
          upgrade={selectedUpgrades[part.idnt]}
        />
      ))}

      <CompatibilityDrawer
        open={openModal}
        onClose={() => setOpenModal(false)}
        errors={compatibilityErrors}
      />
    </>
  );
};

export default Parts;
