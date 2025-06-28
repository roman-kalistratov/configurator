import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { StyledIconButton } from './styles';
import { clearUpgrade } from '@/redux/slices/upgradesStateSlice';
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import { useDispatch } from 'react-redux';

const SelectedPartUpgrade = ({ partIdnt, upgrade }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <img
          src={upgrade.img}
          alt={upgrade.name}
          style={{
            width: 40,
            height: 40,
            objectFit: 'contain',
          }}
        />
        <Box>
          <Typography variant="h2" fontSize={16}>
            {upgrade.name}
          </Typography>
          <Typography variant="body2">KSP SPU: {upgrade.uin}</Typography>
        </Box>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ ml: 'auto' }}
      >
        <Box sx={{}}>
          <Typography
            variant="body1"
            fontWeight={600}
            fontSize={16}
            align="left"
            noWrap
            sx={{ margin: '0 20px' }}
          >
            Price: {upgrade.price}₪
          </Typography>
        </Box>

        <Tooltip title="switch">
          <StyledIconButton>
            <CachedIcon />
          </StyledIconButton>
        </Tooltip>
        <Tooltip title="link">
          <StyledIconButton>
            <LinkIcon />
          </StyledIconButton>
        </Tooltip>
        <Tooltip title="remove">
          <StyledIconButton
            onClick={(e) => {
              e.stopPropagation();
              dispatch(clearUpgrade({ partIdnt: partIdnt }));
            }}
          >
            <CloseIcon />
          </StyledIconButton>
        </Tooltip>
      </Stack>
    </>
  );
};

export default SelectedPartUpgrade;
