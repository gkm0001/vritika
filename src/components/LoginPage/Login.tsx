'use client';

import { useState } from 'react';
import { Box, Flex, Image } from '@mantine/core';
import AuthPageImg from '../../assets/auth_page_image.png';
import OTPInput from './OTPInput';
import SignIn from './SignIn';
import classes from './Login.module.css';

const Login = () => {
  const [isEmail, setIsEmail] = useState(true);
  const setIsEmailHandler = () => {
    setIsEmail(false);
  };
  return (
    <Box className={classes.main}>
      <Flex justify="center" align="center" wrap="wrap" h="inherit">
        {isEmail ? <SignIn emailHandler={setIsEmailHandler} /> : <OTPInput />}
        <Box className={classes.right}>
          <Image className={classes.img} src={AuthPageImg} alt="demo" width={691} height={859} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
