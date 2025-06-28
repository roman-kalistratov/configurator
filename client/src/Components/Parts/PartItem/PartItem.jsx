import { openModal } from '@/redux/slices/modalStateSlice';
import { IconButton, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { StyledStack, TitleTypography } from './styles';
import { setSelectedPart } from '@/redux/slices/partSlice';
import AddIcon from '@mui/icons-material/Add';
import { memo } from 'react';
import IconsByPart from '../../../Helpers/IconsByPart';
import SelectedPartUpgrade from './SelectedPartUpgrade';

const PartItem = ({ part, isSelected, upgrade }) => {
  const dispatch = useDispatch();

  const handleSelectedPart = () => {
    dispatch(setSelectedPart(part));
    dispatch(openModal());
  };

  return (
    <StyledStack
      direction="row"
      isSelected={isSelected}
      onClick={handleSelectedPart}
    >
      <Stack spacing={1} direction="row" alignItems="center">
        <IconsByPart partIdnt={part?.idnt} />
        <TitleTypography variant="h2">{part?.title}</TitleTypography>
      </Stack>

      {!upgrade && part.is_required && (
        <TitleTypography variant="body2" fontSize={16}>
          Selection required to build your PC.
        </TitleTypography>
      )}

      {upgrade ? (
        <SelectedPartUpgrade partIdnt={part.idnt} upgrade={upgrade} />
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ ml: 'auto' }}
        >
          <Typography
            variant="h2"
            color="primary.main"
            sx={{ whiteSpace: 'nowrap' }}
          >
            Choose
          </Typography>
          <IconButton color="primary" sx={{ pt: 1.2 }}>
            <AddIcon />
          </IconButton>
        </Stack>
      )}
    </StyledStack>
  );
};

export default memo(PartItem);
