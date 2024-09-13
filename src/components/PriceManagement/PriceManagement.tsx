import { Box } from '@mantine/core';
import PriceHistoryChart from './PriceHistoryChart';
import ProductPriceTable from './ProductPriceTable';

const PriceManagement = () => {
  return (
    <Box>
      <ProductPriceTable />
      <PriceHistoryChart />
    </Box>
  );
};

export default PriceManagement;
