import { Box, Button, IconButton, Link, Typography } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import * as S from './styles';
import { useDispatch } from 'react-redux';
import {
  addItemToCompare,
  openCompareDrawer,
} from '../../../../../../../../redux/slices/compareStateSlice';
import TopDrawer from '../../../../../../../Drawer/TopDrawer';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';

const UpgradeItemLabel = ({
  partIdnt,
  uin,
  name,
  price,
  img,
  url,
  viewTypeList,
  isSelected,
  handleSelect,
}) => {
  const dispatch = useDispatch();
  const [openInfo, setOpenInfo] = useState(false);

  const __onClickCompare = () => {
    dispatch(addItemToCompare({ partIdnt, item: uin }));
    setOpenInfo(true); // локальное уведомление «добавлен в сравнение»
  };

  const __onGoToCompare = () => {
    dispatch(openCompareDrawer(partIdnt)); // открываем глобальный compare drawer
    setOpenInfo(false);
  };

  return (
    <>
      <S.LabelWrapper viewTypeList={viewTypeList}>
        <S.StyledBox viewTypeList={viewTypeList}>
          <Box>
            <img
              src={img}
              alt={name}
              style={{
                width: viewTypeList ? '80px' : '130px',
                height: viewTypeList ? '80px' : '150px',
                minHeight: viewTypeList ? '80px' : '150px',
                marginRight: viewTypeList ? '10px' : '0',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box>
            <Typography variant="body1" fontSize={16} lineHeight={1.2}>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  color: 'customColors.black',
                  width: '100%',
                  textAlign: 'left',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {name}
              </Link>
            </Typography>
            <Typography variant="body2">SKU: {uin}</Typography>
            <Typography
              variant="h2"
              sx={{ display: viewTypeList ? 'none' : 'flex', mt: 2 }}
            >
              ₪{price}
            </Typography>
          </Box>
        </S.StyledBox>

        <S.PriceContainer viewTypeList={viewTypeList}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
            gap={1}
          >
            <Typography
              variant="h2"
              sx={{ display: viewTypeList ? 'flex' : 'none' }}
            >
              ₪{price}
            </Typography>
            <IconButton onClick={__onClickCompare}>
              <CompareArrowsIcon color="primary" />
            </IconButton>
          </Box>
        </S.PriceContainer>
      </S.LabelWrapper>

      <S.StyledCheckbox
        color="primary"
        checked={isSelected}
        onChange={handleSelect}
        viewTypeList={viewTypeList}
      />

      <TopDrawer open={openInfo} onClose={() => setOpenInfo(false)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DoneIcon sx={{ color: 'limegreen' }} />
            <Typography variant="body1" fontSize={16}>
              {name} добавлен в сравнение.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={__onGoToCompare}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Сравнить
            </Button>
            <IconButton size="small" onClick={() => setOpenInfo(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </TopDrawer>
    </>
  );
};

export default UpgradeItemLabel;
