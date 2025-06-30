import { Box, Link, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as S from './styles';

const UpgradeItemLabel = ({ uin, name, price, img, url, viewTypeList }) => (
  <S.LabelWrapper viewTypeList={viewTypeList}>
    <S.StyledBox viewTypeList={viewTypeList}>
      <img
        src={img}
        alt={name}
        style={{
          width: viewTypeList ? '80px' : '150px',
          height: viewTypeList ? '80px' : '150px',
          minHeight: viewTypeList ? '80px' : '150px',
          marginRight: viewTypeList ? '10px' : '0',
          objectFit: 'contain',
        }}
      />
      <Box sx={{ maxWidth: '100%' }}>
        <Typography variant="body1" sx={{ maxWidth: '100%' }}>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              color: 'customColors.black',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {name}
          </Link>
        </Typography>
        <Typography variant="body2">KSP SKU: {uin}</Typography>
      </Box>
    </S.StyledBox>
    <S.PriceContainer viewTypeList={viewTypeList}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h2">₪{price}</Typography>
        <AddIcon color="primary" sx={{ marginLeft: 1 }} />
      </Box>
    </S.PriceContainer>
  </S.LabelWrapper>
);

export default UpgradeItemLabel;
