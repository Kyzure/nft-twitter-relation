import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';

const FormControlStyled = styled(FormControl)(({ theme }) => ({
}));

const SelectStyled = styled(Select)(({ theme }) => ({
  width: '95%',
  color: theme.palette.text.primary,
  '&.Mui-focused': {
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.lighter
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.lighter
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.lighter
  },
  '&:hover .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.lighter
  }
}));

const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-focused': {
    color: theme.palette.text.primary
  }
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    "&.Mui-focusVisible": {
      backgroundColor: theme.palette.primary.main
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  }
}));

function DropdownSelect(props) {
  const Menu = (
    <SelectStyled       
      variant="outlined"
      labelId="label-id"
      id="id"
      value={ props.value }
      label={ props.label }
      size="small"
      onChange={ props.selectOption }>
      {props.options.map((option) =>
        <MenuItemStyled key={ option } value={ option }>{ option }</MenuItemStyled>
      )}
    </SelectStyled>
  );

  return (
    <FormControlStyled sx={{ m: 1, width: '90%' }}>
      <InputLabelStyled id="label-id">
        { props.label }
      </InputLabelStyled>
      {Menu}
    </FormControlStyled>
  );
}

export default DropdownSelect;
