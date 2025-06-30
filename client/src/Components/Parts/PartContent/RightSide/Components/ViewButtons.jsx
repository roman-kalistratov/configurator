import { IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '@/redux/slices/viewStateSlice';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const ViewButtons = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const viewType = useSelector((state) => state.view.listView);
  return (
    <Stack
      direction="row"
      justifyContent="center"
      px={2}
      sx={{
        borderLeft: `1px solid ${theme.palette.secondary.dark}`,
        height: '100%',
        alignItems: 'center',
      }}
    >
      <Tooltip title="Отобразить списком">
        <IconButton onClick={() => dispatch(setView(true))}>
          <FormatListBulletedIcon
            sx={{
              fontSize: 26,
              cursor: 'pointer',
              color: viewType && theme.palette.primary.main,
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Отобразить сеткой">
        <IconButton onClick={() => dispatch(setView(false))}>
          <GridViewIcon
            sx={{
              fontSize: 26,
              cursor: 'pointer',
              color: !viewType && theme.palette.primary.main,
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default ViewButtons;
