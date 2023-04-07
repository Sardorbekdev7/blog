import {Box, AppBar, Toolbar, IconButton, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from 'react'
import { navItem } from '@/config/constants';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useRouter } from 'next/router';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}


function Navbar(props: Props) {
  const { window } = props;

  const router = useRouter()

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{  display: 'flex', justifyContent: 'space-between !important', alignItems: 'center', paddingX: '20px'}}>
      <Box sx={{ my: 2 , display: 'flex', alignItems: 'center'}}>
        <AdjustIcon sx={{scale: '2'}} /> 
        <Typography fontFamily={'fantasy'} variant='h5' ml={'20px'} gap={'5px'}>
          Sardorbek
        </Typography>
      </Box>
      <Divider />
      <CloseIcon onClick={handleDrawerToggle} sx={{ cursor: 'pointer'}}  />

      </Box>
      <List>
        {navItem.map((item) => (
          <ListItem onClick={()=> router.push(item.route)} key={item.route} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box height={'9vh'} sx={{display: 'flex'}}  >
      <AppBar  sx={{backgroundColor: '#141414', height: '9vh'}} component='nav'>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box onClick={() => router.push('/')} sx={{ my: 2 ,  alignItems: 'center', flexGrow: 1, display: { xs: 'none', sm: 'flex', cursor: 'pointer' }}}>
        <AdjustIcon sx={{scale: '2'}} /> 
        <Typography fontFamily={'fantasy'} variant='h5' ml={'20px'} gap={'5px'} component={'div'}>
          Sardorbek
        </Typography>
      </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItem.map((item) => (
              <Button onClick={()=> router.push(item.route)} key={item.route} sx={{ color: '#fff' }}>
                {item.label}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

    </Box>
  )
}

export default Navbar