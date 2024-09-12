import { Box, Button, Checkbox, Flex, Text, TextInput, Title } from '@mantine/core';
import classes from './Login.module.css';

const SignIn = ({ emailHandler }: any) => {
  return (
    <Box m={40} className={classes.left}>
      <Title mb={40} className={classes.title}>
        Sign in
      </Title>

      <TextInput description="Email Id" />
      <Flex my={30} justify={'space-between'}>
        <Checkbox c={'dimmed'} label="Remember me" />
        <Text c={'dimmed'} className={classes.forgot}>
          Forgot Password?
        </Text>
      </Flex>
      <Button
        onClick={() => {
          emailHandler();
        }}
        color="#10B981"
        h={50}
        fullWidth
        radius={30}
      >
        Get OTP
      </Button>
    </Box>
  );
};

export default SignIn;
