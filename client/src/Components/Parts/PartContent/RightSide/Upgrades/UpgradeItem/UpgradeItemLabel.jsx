import { Box, Link, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { memo } from 'react';
import { PriceContainer, StyledBox } from './styles';

const UpgradeItemLabel = ({ uin, name, price, img, url }) => (
  <StyledBox>
    <StyledBox>
      <img
        src={img}
        alt={name}
        style={{
          width: '50px',
          height: '50px',
          marginRight: '10px',
          objectFit: 'contain',
        }}
      />
      <Box>
        <Typography variant="body1">
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
    </StyledBox>
    <PriceContainer>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h2">₪{price}</Typography>
        <AddIcon color="primary" sx={{ marginLeft: 1 }} />
      </Box>
    </PriceContainer>
  </StyledBox>
);

export default memo(UpgradeItemLabel);
