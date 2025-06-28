import { useTheme } from '@emotion/react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { memo, useCallback } from 'react';

const FilterCheckbox = ({ name, isChecked, onChange }) => {
  const theme = useTheme();

  // handleChange мемоизируется, зависит от onChange
  const handleChange = useCallback(() => {
    onChange();
  }, [onChange]);

  return (
    <FormControlLabel
      control={<Checkbox checked={isChecked} onChange={handleChange} />}
      label={name}
      sx={{
        '&:hover': {
          background: theme.palette.secondary.dark,
        },
      }}
    />
  );
};

// Кастомное сравнение props для оптимизации чекбоксов ... чтобы не было при изменении состояния чекбокса перерендеров всех чекбоксов
function areEqual(prevProps, nextProps) {
  return (
    prevProps.isChecked === nextProps.isChecked &&
    prevProps.tag === nextProps.tag &&
    prevProps.name === nextProps.name
    // Игнорируем onChange, так как она создаётся в родителе мемоизированно
  );
}

export default memo(FilterCheckbox, areEqual);
