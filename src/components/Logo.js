import React from 'react';
import {
  Box
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';

const Logo = (props) => {
  const configJson = JSON.parse(sessionStorage.getItem('config'));
  let logo_url = '';
  if(configJson) {    
    logo_url = configJson.logo_url;
  }

  return (
    <Box
    alignItems="center"
        display="flex"
        >
       {/* <img style={{width:'24px',marginRight:'3px'}}
      alt="Logo"
      src={logo_url}
      {...props}
    /> */}

    {/* <DashboardIcon style={{color: '#fff'}} /> */}
    <h3 style={{color:"#fff"}}>
     {configJson ? (configJson.logo_title ? configJson.logo_title : '') : ''}
    </h3>
    </Box>
   
  );
};

export default Logo;
