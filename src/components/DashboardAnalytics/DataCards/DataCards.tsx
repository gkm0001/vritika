import { IconAntennaBars4 } from '@tabler/icons-react';
import { Box, Card, Paper, Text } from '@mantine/core';
import classes from './DataCards.module.css';

const data = [
  {
    name: 'Total Sales',
    Icon: IconAntennaBars4,
    stats: '$377',
    percentStat: '+23%',
  },
  {
    name: 'Active Brands',
    Icon: IconAntennaBars4,
    stats: '64',
    // percentStat: '+23%',
  },
  {
    name: 'Number of Customers',
    Icon: IconAntennaBars4,
    stats: '3000',
    // percentStat: '+23%',
  },
  {
    name: 'Number of Admins',
    Icon: IconAntennaBars4,
    stats: '30',
    // percentStat: '+23%',
  },
];

const DataCards = () => (
  <Box p={5} display="flex" className={classes.box}>
    {data.map(({ name, Icon, stats, percentStat }: any) => (
      <Card m={10} radius={25} className={classes.card}>
        <Box className={classes.iconBox}>
          <Icon width="45px" height="45px" color="#10B981" />
        </Box>
        <Box>
          <Text c="dimmed" size="14px">
            {name}
          </Text>
          <Text size="24px" py={10}>
            {stats}
          </Text>
          {percentStat && (
            <Text size="12px" c="dimmed">
              {' '}
              <span className={classes.span}> {percentStat}</span> since last month
            </Text>
          )}
        </Box>
      </Card>
    ))}
  </Box>
);

export default DataCards;
