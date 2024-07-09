import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

const MenuItemDrop = styled(MenuItem)(() => ({
  '&:hover': {
    background: '#689eca',
  },
  '&:active': {
    background: '#194970',
  }
}));

export default MenuItemDrop;