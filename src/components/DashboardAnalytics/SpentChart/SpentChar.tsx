import { IconAntennaBars5, IconCalendar, IconCaretUpFilled } from '@tabler/icons-react';
import { AreaChart } from '@mantine/charts';
import { Box, Group, Paper, Select, Text } from '@mantine/core';
import { data } from './chartdata';
import classes from './SpentChart.module.css';

interface ChartTooltipProps {
  payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" bg="#10B981" radius="md">
      {payload.map((item: any, index: number) => (
        <Text key={index} c="#fff" fz="sm">
          {item.name}: {item.value}
        </Text>
      ))}
    </Paper>
  );
}
const SpentChart = () => (
  <Box className={classes.main}>
    <Group mb={30} display="flex" justify="space-between">
      <Select
        classNames={{ input: classes.input, root: classes.root }}
        leftSection={<IconCalendar color="#A3AED0" />}
        defaultValue="This Month"
        data={['This Month', 'Past Month', 'Prev Year']}
      />
      <Box className={classes.charticon}>
        <IconAntennaBars5 color="#10B981" />
      </Box>
    </Group>
    <Group wrap="wrap" justify="space-between" align="flex-start">
      <Box>
        <Text size="34px" fw={600} c="#2B3674">
          $37.5K
        </Text>
        <Text c="dimmed">Total Spent</Text>
        <Text c="#10B981" display="flex">
          <IconCaretUpFilled /> +2.45%{' '}
        </Text>
      </Box>
      <Box className={classes.chartmain}>
        <AreaChart
          h={229}
          data={data}
          dataKey="date"
          activeDotProps={{ r: 8, strokeWidth: 1, fill: '#fff', stroke: '#10B981' }}
          series={[{ name: 'Tomatoes', color: '#FFC727' }]}
          tooltipProps={{
            content: ({ payload }: any) => <ChartTooltip payload={payload} />,
          }}
          curveType="natural"
          withYAxis={false}
        />
      </Box>
    </Group>
  </Box>
);

export default SpentChart;
