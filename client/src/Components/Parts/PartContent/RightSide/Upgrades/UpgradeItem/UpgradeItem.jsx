import { Checkbox } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import { StyledFormControl } from './styles';
import UpgradeItemLabel from './UpgradeItemLabel';
import { useDispatch } from 'react-redux';
import { clearUpgrade, setUpgrade } from '@/redux/slices/upgradesStateSlice';
import { clearFilters, setFilter } from '@/redux/slices/filtersStateSlice';

const UpgradeItem = ({
  uin,
  name,
  price,
  img,
  tags,
  url,
  partType,
  partIdnt,
  isSelected,
  allFiltersForPart,
}) => {
  const dispatch = useDispatch();

  const item = useMemo(
    () => ({ uin, name, price, img, tags, partType }),
    [uin, name, price, img, tags, partType],
  );

  const handleSelect = useCallback(
    (event) => {
      const checked = event.target.checked;

      if (!checked) {
        dispatch(clearUpgrade({ partIdnt }));
        dispatch(clearFilters(partIdnt));
        return;
      }

      dispatch(clearFilters(partIdnt));

      dispatch(setUpgrade({ partIdnt, upgrade: item }));

      if (allFiltersForPart) {
        Object.entries(item.tags).forEach(([rawKey, tags]) => {
          const key = `c_${rawKey}`;
          const filterGroup = allFiltersForPart[key];

          if (filterGroup) {
            tags.forEach((tag) => {
              const filter = filterGroup[tag];
              if (filter) {
                dispatch(
                  setFilter({
                    partIdnt,
                    key,
                    tag,
                    tagName: filter.name,
                    title: filterGroup.title || '',
                    partType: item.partType,
                  }),
                );
              }
            });
          }
        });
      }
    },
    [dispatch, partIdnt, allFiltersForPart, item],
  );

  return (
    <StyledFormControl
      sx={{
        marginRight: 0,
        '& .MuiFormControlLabel-label': { marginRight: 0 },
      }}
      control={
        <Checkbox
          color="primary"
          checked={isSelected}
          onChange={handleSelect}
        />
      }
      label={
        <UpgradeItemLabel
          uin={uin}
          name={name}
          price={price}
          img={img}
          url={url}
        />
      }
    />
  );
};

export default memo(UpgradeItem);
