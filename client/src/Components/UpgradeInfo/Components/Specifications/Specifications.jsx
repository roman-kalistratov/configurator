import { Grid } from '@mui/material';
import * as S from './style';

const Specifications = ({ specification }) => {
  return (
    <>
      <S.SpecificationsTitleWrapper>
        <S.StyledTitle variant="h2" component="h2" textAlign="center" dir="rtl">
          מפרט טכני של Palit GeForce RTX 5060 Dual [8GB, 3840 CUDA]
        </S.StyledTitle>
      </S.SpecificationsTitleWrapper>

      <S.SpecificationsWrapper>
        <S.GridContainer
          container
          role="list"
          aria-label="Product specifications"
        >
          {Object.entries(specification).map(([key, value], index, arr) => (
            <S.SpecificationRow
              container
              item
              size={12}
              key={index}
              sx={{
                borderBottom: index !== arr.length - 1 ? undefined : 'none',
              }}
            >
              <Grid item size={{ xs: 12, sm: 6 }}>
                <S.StyledText variant="body1" fontWeight={700}>
                  {key}
                </S.StyledText>
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <S.StyledText variant="body1">{value}</S.StyledText>
              </Grid>
            </S.SpecificationRow>
          ))}
        </S.GridContainer>
      </S.SpecificationsWrapper>
    </>
  );
};

export default Specifications;
