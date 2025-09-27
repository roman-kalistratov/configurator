import { Tooltip } from '@mui/material';
import * as S from './style';

const LinkActions = ({ upgradeMainLink, manufacturerLink }) => {
  return (
    <>
      <S.GridItem item size={12}>
        {upgradeMainLink && (
          <Tooltip title="Link to item">
            <S.StyledIconButton
              component="a"
              href={upgradeMainLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open item page"
            >
              <S.ResponsiveLinkIcon aria-hidden="true" />
            </S.StyledIconButton>
          </Tooltip>
        )}
        {manufacturerLink && (
          <Tooltip title="Manufacturer link">
            <S.StyledIconButton
              component="a"
              href={manufacturerLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open manufacturer website"
              sx={{ ml: { xs: 1.5, md: 1 } }}
            >
              <S.ResponsiveLaunchIcon aria-hidden="true" />
            </S.StyledIconButton>
          </Tooltip>
        )}
      </S.GridItem>
    </>
  );
};

export default LinkActions;
