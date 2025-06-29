import { clearAllFilters } from '@/redux/slices/filtersStateSlice';
import { clearAllUpgrades } from '@/redux/slices/upgradesStateSlice';
import PrintIcon from '@mui/icons-material/Print';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import ControlButton from './ControlButton/ControlButton';

const ControlButtons = () => {
  const dispatch = useDispatch();

  const handleClearAllData = () => {
    dispatch(clearAllFilters());
    dispatch(clearAllUpgrades());
  };

  return (
    <Stack spacing={1} direction="row">
      <ControlButton icon={<SaveIcon />} label="Save" />
      <ControlButton
        icon={<RestartAltIcon />}
        label="Reset"
        onClick={() => handleClearAllData()}
      />
      <ControlButton icon={<PrintIcon />} label="Print" />
      <ControlButton icon={<UploadIcon />} label="Code" />
    </Stack>
  );
};

export default ControlButtons;
