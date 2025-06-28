import { openModal } from '@/redux/slices/modalStateSlice';
import { setSelectedPart } from '@/redux/slices/partSlice';
import { useTheme } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const UpgradeZone = ({
  idnt,
  partTitle,
  left,
  top,
  width,
  height,
  title,
  imageUrl,
  zIndex = 1,
  isCase = false,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const upgrade = useSelector(
    (state) => state.upgrades.selectedUpgrades[idnt],
    shallowEqual
  );

  const handleSetPart = useCallback(() => {
    dispatch(setSelectedPart({ idnt, title: partTitle }));
    dispatch(openModal());
  }, [dispatch, idnt, partTitle]);

  const backgroundStyle = useMemo(() => {
    if (upgrade && imageUrl) {
      return `url(${imageUrl}) no-repeat center / 100% 100%`;
    }
    return 'none';
  }, [upgrade, imageUrl]);

  const hoverBackground = useMemo(() => {
    if (upgrade && imageUrl) {
      return `url(${imageUrl}) no-repeat center / 100% 100%`;
    }
    return theme.palette.customColors.greyLight;
  }, [upgrade, imageUrl, theme]);

  return (
    <Box
      sx={{
        width,
        height,
        position: 'absolute',
        top,
        left,
        cursor: 'pointer',
        border: '1px solid transparent',
        borderRadius: '5px',
        zIndex,
        background: backgroundStyle,
        '&:hover': {
          outline: !upgrade && '.0625rem solid rgb(126, 118, 118)',
          borderRadius: '5px',
          background: hoverBackground,
        },
      }}
      onClick={handleSetPart}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {upgrade ? (
        <Typography
          variant='body2'
          fontSize={12}
          sx={{
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.1s ease',
            whiteSpace: 'nowrap',
            color: 'white',
            position: 'absolute',
            left: isCase ? '12%' : '8%',
            top: isCase ? '2%' : '1%',
          }}
        >
          {title}
        </Typography>
      ) : (
        <Box
          position='absolute'
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: hovered ? '12px' : '50%',
            padding: '0.2rem 0.255rem',
            cursor: 'pointer',
            backgroundColor: theme.palette.primary.light,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <AddIcon
            sx={{
              color: theme.palette.primary.contrastText,
              fontSize: '12px',
            }}
          />
          <Box
            sx={{
              overflow: 'hidden',
              maxWidth: hovered ? '40px' : '0px',
              marginLeft: hovered ? '2px' : '0px',
            }}
          >
            <Typography
              variant='body2'
              fontSize={10}
              sx={{
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.1s ease',
                whiteSpace: 'nowrap',
                color: 'white',
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(UpgradeZone);
