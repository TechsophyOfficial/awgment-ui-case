import React from 'react';
import { Box } from '@material-ui/core';

const Logo = () => {
  const configJson = JSON.parse(sessionStorage.getItem('config'));

  return (
    <Box
      alignItems="center"
      display="flex"
    >
      <h3 style={{ color: "#fff" }}>
        {configJson ? (configJson.logo_title ? configJson.logo_title : '') : ''}
      </h3>
    </Box>
  );
};

export default Logo;
