import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IconAntennaBars5, IconCalendar } from '@tabler/icons-react';
import { AreaChart } from '@mantine/charts';
import { Box, Group, Paper, Select, Text, Title } from '@mantine/core';
import { elements } from './priceManagementData';
import classes from './PriceHistoryChart.module.css';

type ElementType = {
  currentPrice: number;
  category: string;
  productComponent: string;
  lastUpdated: string; // Make sure lastUpdated is included in the type
};
interface ChartTooltipProps {
  payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ payload }: ChartTooltipProps) {
  if (!payload) {
    return null;
  }

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
const PriceHistoryChart = () => {
  const [data, setData] = useState<ElementType[]>([]);
  useEffect(() => {
    setData(() =>
      elements.map((el) => {
        const { lastUpdated, ...row } = el;
        const newDate = dayjs(lastUpdated).format('DD MMM');
        return { ...row, lastUpdated: newDate };
      })
    );
  });

  console.log(elements);

  return (
    <Box className={classes.main}>
      <Title fz={24} c="brand" mb={40}>
        Price History Chart
      </Title>
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
        <Box className={classes.chartmain}>
          <AreaChart
            h={229}
            data={data}
            dataKey="lastUpdated"
            activeDotProps={{ r: 8, strokeWidth: 1, fill: '#fff', stroke: '#10B981' }}
            series={[
              { name: 'currentPrice', color: 'indigo.6' },
              { name: 'Inverters', color: 'blue.6' },
              { name: 'Batteries', color: 'teal.6' },
            ]}
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
};

export default PriceHistoryChart;
