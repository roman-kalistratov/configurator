import { removeUpgrade, setUpgrade } from '@/redux/slices/filtersStateSlice';
import { closeModal } from '@/redux/slices/modalStateSlice';
import AddIcon from '@mui/icons-material/Add';
import { Box, Checkbox, Typography } from '@mui/material';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PriceContainer, StyledBox, StyledFormControl } from './styles';

const UpgradeItem = ({ item, priceDifference }) => {
  const dispatch = useDispatch();

  // Мемоизируем `isSelected`, чтобы не триггерить ререндеры
  const isSelected = useSelector((state) =>
    state.filters.selectedUpgrades.some((upgrade) => upgrade.uin === item.uin)
  );

  const handleSelect = useCallback(() => {
    if (isSelected) {
      console.log(item);
      dispatch(removeUpgrade(item.partIdnt)); // или part.idnt, если item не содержит partIdnt
    } else {
      dispatch(setUpgrade(item));
      dispatch(closeModal());
    }
  }, [dispatch, item, isSelected]);

  return (
    <StyledFormControl
      control={
        <Checkbox
          color='primary'
          checked={isSelected}
          onChange={handleSelect}
        />
      }
      label={
        <StyledBox>
          <StyledBox>
            <img
              src='https://ksp.co.il/shop/items/128/289975.jpg'
              alt={item.name}
              style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
            <Box>
              <Typography variant='body1'>{item.name}</Typography>
              <Typography variant='body2'>KSP SKU: {item.uin}</Typography>
            </Box>
          </StyledBox>
          <PriceContainer>
            <Box display='flex' alignItems='center' gap={1}>
              <Typography variant='h2'>
                {priceDifference ? priceDifference : `₪${item.price}`}
              </Typography>
              <AddIcon color='primary' sx={{ marginLeft: 1 }} />
            </Box>
          </PriceContainer>
        </StyledBox>
      }
    />
  );
};

export default memo(UpgradeItem);
