import { IconBell, IconInfoCircle, IconSearch } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { Box, Group, Text, TextInput } from '@mantine/core';
import classes from './DashboardMain.module.css';

const DashboardHeader = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'main';

  return (
    <Group visibleFrom="sm" justify="space-between" className={classes.headright} px="md">
      <Box display="flex">
        <Box>
          <Text c="#8991C1" fw={700}>
            Hello Mahabali!
          </Text>
          <Text c="#2B3674" className={classes.navName} fw={700}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Dashboard
          </Text>
        </Box>
      </Box>
      <Box className={classes.searchBox}>
        <TextInput
          radius={20}
          classNames={{ input: classes.searchinput }}
          leftSection={<IconSearch />}
          placeholder="Search"
        />
        <IconBell className={classes.icon} />
        <IconInfoCircle className={classes.icon} />
      </Box>
    </Group>
  );
};
export default DashboardHeader;
