'use client';

import { useState } from 'react';
import {
  IconArchiveFilled,
  IconFileAnalytics,
  IconHomeFilled,
  IconLogout,
  IconSettings,
  IconTagFilled,
  IconUserFilled,
} from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppShell, Avatar, Badge, NavLink, ScrollArea, ThemeIcon } from '@mantine/core';

const navLinksData = [
  {
    name: 'Dashboard',
    Icon: IconHomeFilled,
    type: 'main',
  },
  {
    name: 'Price Management',
    Icon: IconArchiveFilled,
    right: true,
    type: 'price',
  },
  {
    name: 'Brand Management',
    Icon: IconTagFilled,
    type: 'brand',
  },
  {
    name: 'User Management',
    Icon: IconUserFilled,
    type: 'user',
  },
  {
    name: 'Reporting and Analytics',
    Icon: IconFileAnalytics,
    type: 'report',
  },
];

const DashboardNavbar = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [active, setActive] = useState(type);
  const navigate = useNavigate();
  return (
    <>
      <AppShell.Section grow component={ScrollArea}>
        {navLinksData.map(({ name, Icon, right, type }, index) => (
          <NavLink
            my={10}
            // active={index === active}
            key={index}
            label={name}
            leftSection={
              <ThemeIcon
                radius="lg"
                color="#4FD1C5"
                p={4}
                style={{ boxShadow: '0px 3.5px 14px 0px #0000000F' }}
                bd={0}
                variant={type === active ? 'filled' : 'default'}
                size="xl"
              >
                <Icon width="20px" height="20px" color={type !== active ? '#4FD1C5' : '#fff'} />
              </ThemeIcon>
            }
            onClick={(event: any) => {
              event.preventDefault();
              navigate(`/dashboard?type=${type}`);
              setActive(type);
            }}
            rightSection={
              right && (
                <Badge bg="#FBFBFB" c="#10B981">
                  24
                </Badge>
              )
            }
          />
        ))}
      </AppShell.Section>
      <AppShell.Section>
        <NavLink label="Settings" leftSection={<IconSettings color="#A3AED0" />} />
        <NavLink label="Log Out" leftSection={<IconLogout color="#A3AED0" />} />
        <NavLink
          href="#required-for-focus"
          label="Mahabali"
          description="mahabali@gmail.com"
          leftSection={<Avatar />}
        />
      </AppShell.Section>
    </>
  );
};
export default DashboardNavbar;
