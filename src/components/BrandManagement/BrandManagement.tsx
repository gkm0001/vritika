import { Box } from '@mantine/core';
import BrandList from './BrandList';
import TopBrands from './TopBrands';

const BrandManagement = () => {
  return (
    <Box>
      <Box>
        <BrandList />
        <TopBrands />
      </Box>
    </Box>
  );
};

export default BrandManagement;
