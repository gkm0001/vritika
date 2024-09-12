'use client';

import { useState } from 'react';
import { Box, Button, Group } from '@mantine/core';
import UserList from './UserList';

const data = ['Sales Person', 'Admin', 'Customer'];
const UserManagement = () => {
  const [active, setActive] = useState('Sales Person');
  return (
    <Box p={5}>
      <Box>
        <Group m="md">
          {data.map((el: string, index: number) => (
            <Button
              size="md"
              bd="none"
              radius={12}
              c={active === el ? '#fff' : '#828282'}
              fw={500}
              key={index}
              variant={active === el ? 'filled' : 'default'}
              bg={active === el ? '#10B981' : '#fff'}
              onClick={() => setActive(el)}
            >
              {el}
            </Button>
          ))}
        </Group>
        <Box>
          <UserList />
        </Box>
      </Box>
    </Box>
  );
};
export default UserManagement;
