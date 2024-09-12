import { useState } from 'react';
import { Box, Button, Checkbox, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import classes from './UserList.module.css';

const EditData = ({ rowData, updateEditHandler, onClose, isEdit }: any) => {
  if (!isEdit) {
    // eslint-disable-next-line no-param-reassign
    rowData = {
      name: '',
      role: '',
      email: '',
      status: false,
      lastLogin: null,
    };
  }
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
        label="Name"
        c="dimmed"
        defaultValue={data.name}
        classNames={{ input: classes.input, root: classes.inputroot }}
        onChange={(event) => setData(() => ({ ...data, name: event.target.value }))}
      />
      {/* </Group> */}
      <TextInput
        my={20}
        p={5}
        px={15}
        label="Role"
        c="dimmed"
        defaultValue={data.role}
        classNames={{ input: classes.input, root: classes.inputroot }}
        onChange={(event) => setData(() => ({ ...data, role: event.target.value }))}
      />
      <TextInput
        my={20}
        p={5}
        px={15}
        label="Email"
        type="email"
        c="dimmed"
        defaultValue={data.email}
        classNames={{ input: classes.input, root: classes.inputroot }}
        onChange={(event) => setData(() => ({ ...data, email: event.target.value }))}
      />
      <Checkbox
        my={20}
        p={5}
        px={15}
        checked={data.status}
        label="Completed"
        c="dimmed"
        onChange={(event) => setData(() => ({ ...data, status: event.target.checked }))}
      />
      <DateInput
        my={20}
        p={5}
        px={15}
        label="Last Login"
        c="dimmed"
        defaultValue={data.lastLogin}
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
        {isEdit ? 'Save' : 'Add'}
      </Button>
    </Box>
  );
};
export default EditData;
