import { Box, Link, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as S from './styles';

const UpgradeItemLabel = ({
  uin,
  name,
  price,
  img,
  url,
  viewTypeList,
  isSelected,
  handleSelect,
}) => (
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
          <AddIcon color="primary" sx={{ marginLeft: 1 }} />
        </Box>
      </S.PriceContainer>
    </S.LabelWrapper>
    <S.StyledCheckbox
      color="primary"
      checked={isSelected}
      onChange={handleSelect}
      viewTypeList={viewTypeList}
    />
  </>
);

export default UpgradeItemLabel;
