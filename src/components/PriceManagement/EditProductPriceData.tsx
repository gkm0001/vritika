import { useState } from 'react';
import { Box, Button, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import classes from './PriceManagement.module.css';

const EditProductPriceData = ({ rowData, updateEditHandler, onClose }: any) => {
  const [data, setData] = useState(rowData);
  const updateDatahandler = () => {
    updateEditHandler(data);
  };
  return (
    <Box>
      {/* <Group my={20} justify="space-between"> */}
      <TextInput
        my={20}
        p={5}
        px={15}
        label="Product/Component"
        c="dimmed"
        defaultValue={data.productComponent}
        classNames={{ input: classes.input, root: classes.inputroot }}
        onChange={(event) => setData(() => ({ ...data, name: event.target.value }))}
      />
      {/* </Group> */}
      <TextInput
        my={20}
        p={5}
        px={15}
        label="Category"
        c="dimmed"
        defaultValue={data.category}
        classNames={{ input: classes.input, root: classes.inputroot }}
        onChange={(event) => setData(() => ({ ...data, role: event.target.value }))}
      />
      <TextInput
        my={20}
        p={5}
        px={15}
        label="Current Price (INR)"
        type="email"
        c="dimmed"
        defaultValue={data.currentPrice}
        classNames={{ input: classes.input, root: classes.inputroot }}
        onChange={(event) => setData(() => ({ ...data, email: event.target.value }))}
      />
      <DateInput
        my={20}
        p={5}
        px={15}
        label="Last Updated"
        c="dimmed"
        defaultValue={data.lastUpdated}
        classNames={{ input: classes.input, root: classes.inputroot }}
        onChange={(event) => {
          setData(() => ({
            ...data,
            lastLogin: new Date(
              event?.getFullYear() ?? 0,
              event?.getMonth() ?? 0,
              event?.getDate()
            ),
          }));
        }}
      />
      <Button
        mt={30}
        fullWidth
        onClick={() => {
          updateDatahandler();
          onClose();
        }}
      >
        Save
      </Button>
    </Box>
  );
};
export default EditProductPriceData;
