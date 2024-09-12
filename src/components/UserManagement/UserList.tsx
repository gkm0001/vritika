import dayjs from 'dayjs';
import { useState } from 'react';
import {
  IconEdit,
  IconFileBarcode,
  IconInfoCircle,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { Box, Button, Checkbox, Chip, Group, Modal, Table, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { users } from './data';
import EditData from './EditData';
import classes from './UserList.module.css';

const UserList = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedElements, setSortedElements] = useState(users);
  const [opened, { open, close }] = useDisclosure(false);
  const [editIndex, setEditIndex] = useState<null | number>(null);
  const [isEdit, setIsEdit] = useState(true); //true if editing, false if adding new data.
  const toggleAllRowsSelection = (event: any) => {
    if (event.target.checked) {
      setSelectedRows([...Array(users.length).keys()]);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSort = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    const sorted = [...sortedElements].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    setSortedElements(sorted);
  };

  const handleDelete = () => {
    // Filter out the selected rows
    const updatedElements = sortedElements.filter((_, index) => !selectedRows.includes(index));
    setSortedElements(updatedElements);
    setSelectedRows([]); // Optionally clear selected rows after deletion
  };

  const updateEditHandler = (newData: any) => {
    setSortedElements((prevElements) => {
      if (isEdit && editIndex !== null) {
        return prevElements.map((el, index) => (index === editIndex ? newData : el));
      }
      return [newData, ...prevElements];
    });
  };

  const rows = sortedElements.map((element, index: number) => (
    <Table.Tr
      key={index}
      bg={selectedRows.includes(index) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(index)}
          onChange={(event) =>
            setSelectedRows((prev) =>
              event.currentTarget.checked
                ? [...prev, index]
                : prev.filter((position) => position !== index)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.role}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      {/* <Table.Td>{element.status}</Table.Td> */}

      <Table.Td>
        <Chip checked={element.status} color={element.status ? 'green' : 'red'} variant="light">
          Completed
        </Chip>
      </Table.Td>
      <Table.Td>{dayjs(element.lastLogin).format('DD-MMM-YYYY')}</Table.Td>
      <Table.Td>
        <Button
          onClick={() => {
            open();
            setEditIndex(index);
            setIsEdit(true);
          }}
          variant="transparent"
        >
          <IconEdit color="#DBDBDB" />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box w="-webkit-fill-available" m="md" p="md" bg="#fff" className={classes.main}>
      <Group mb={30} justify="space-between" wrap="wrap">
        <Title c="brand">User List</Title>
        <Group>
          <TextInput
            radius={20}
            classNames={{ input: classes.searchinput }}
            leftSection={<IconSearch />}
            placeholder="Search"
          />
          <Button.Group py={20} classNames={{ group: classes.group }}>
            <Button variant="default" className={classes.root}>
              <IconFileBarcode color="#10B981" />
            </Button>
            <Button variant="default" className={classes.root2}>
              {' '}
              <IconInfoCircle color="#10B981" />
            </Button>
            <Button variant="default" onClick={handleDelete} className={classes.root}>
              <IconTrash color="#10B981" />
            </Button>
          </Button.Group>
          <Button
            size="md"
            onClick={() => {
              open();
              setIsEdit(false);
            }}
            radius="lg"
          >
            <IconPlus /> {'  '}Add User
          </Button>
        </Group>
      </Group>
      <Table border={5} withTableBorder horizontalSpacing="md">
        <Table.Thead bg="#EEF2FF">
          <Table.Tr>
            <Table.Th>
              <Checkbox onChange={toggleAllRowsSelection} label="#" />
            </Table.Th>
            <Table.Th>
              <Button variant="transparent" c="black" onClick={handleSort}>
                Name {sortDirection === 'asc' ? '▲' : '▼'}
              </Button>
            </Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Last Login</Table.Th>
            <Table.Th>Edit</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Modal
        opened={opened}
        onClose={close}
        title={isEdit ? 'Edit Data' : 'Add new data'}
        c="brand"
      >
        <EditData
          rowData={editIndex !== null ? sortedElements[editIndex] : undefined}
          updateEditHandler={updateEditHandler}
          onClose={close}
          isEdit={isEdit}
        />
      </Modal>
    </Box>
  );
};

export default UserList;
