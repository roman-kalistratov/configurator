import { Stack } from '@mui/material';
import * as S from './style';

const UpgradeHero = ({ mainImg, title, subtitle }) => {
  return (
    <>
      <S.LeftColumn item size={{ xs: 12, md: 6 }}>
        <Stack textAlign="right" spacing={2} dir="rtl">
          <S.StyledTitle variant="h1" component="h1">
            {title}
          </S.StyledTitle>
          <S.StyledSubTitle variant="h2" component="h2">
            {subtitle}
          </S.StyledSubTitle>
        </Stack>
      </S.LeftColumn>

      <S.RightColumn item size={{ xs: 12, md: 6 }}>
        <img
          src={mainImg}
          alt={title}
          style={{
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '400px',
          }}
        />
      </S.RightColumn>
    </>
  );
};

export default UpgradeHero;
