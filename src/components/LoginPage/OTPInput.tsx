'use client';

import { SyntheticEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, Flex, PinInput, Text, Title } from '@mantine/core';
import classes from './Login.module.css';

const OTPInput = () => {
  const navigate = useNavigate();
  return (
    <Box m={40} className={classes.left}>
      <Title mb={40} className={classes.verify_title}>
        Enter your verification code
      </Title>
      <Text mb={10}>Enter the OTP sent to your email id.</Text>
      <PinInput
        type={/^[0-9]*$/}
        inputType="tel"
        inputMode="numeric"
        placeholder=""
        length={6}
      />{' '}
      <Flex my={30} justify="space-between">
        <Checkbox c="dimmed" label="Remember me" />
        <Text c="dimmed" className={classes.forgot}>
          Forgot Password?
        </Text>
      </Flex>
      <NavLink to="/dashboard">
        <Button
          onClick={(e: SyntheticEvent) => {
            e.preventDefault();
            navigate('/dashboard?type=main');
          }}
          color="#10B981"
          h={50}
          fullWidth
          radius={30}
        >
          Login
        </Button>
      </NavLink>
    </Box>
  );
};

export default OTPInput;
