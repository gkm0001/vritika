import { Box, Group } from '@mantine/core';
import DataCards from '../DashboardAnalytics/DataCards/DataCards';
import DataTable from '../DashboardAnalytics/DataTable/DataTable';
import DatePickerSection from '../DashboardAnalytics/DatePicker/DatePicker';
import SpentChart from '../DashboardAnalytics/SpentChart/SpentChar';

const DashboardMain = () => (
  <Box px={30} py={10}>
    <DataCards />
    <Group p={5} py={20} display="flex" align="normal" justify="space-between">
      <SpentChart />
      <DatePickerSection />
    </Group>
    <DataTable />
  </Box>
);

export default DashboardMain;
