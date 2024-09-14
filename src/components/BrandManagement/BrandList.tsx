import { useState } from 'react';
import {
  IconEdit,
  IconFileBarcode,
  IconInfoCircle,
  IconMessage,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { Box, Button, Checkbox, Chip, Group, Modal, Table, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddNewBrand from './AddNewBrand';
import { brands } from './data';
import classes from './BrandList.module.css';

const BrandList = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedElements, setSortedElements] = useState(brands);
  const [opened, { open, close }] = useDisclosure(false);
  const [editIndex, setEditIndex] = useState<null | number>(null);
  const [isEdit, setIsEdit] = useState(true); //true if editing, false if adding new data.
  const toggleAllRowsSelection = (event: any) => {
    if (event.target.checked) {
      setSelectedRows([...Array(brands.length).keys()]);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSort = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    const sorted = [...sortedElements].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.brandName.localeCompare(b.brandName);
      }
      return b.brandName.localeCompare(a.brandName);
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
      <Table.Td>{element.brandName}</Table.Td>
      <Table.Td>{element.products}</Table.Td>
      <Table.Td>{element.components}</Table.Td>
      {/* <Table.Td>{element.status}</Table.Td> */}

      <Table.Td>
        <Chip
          checked
          icon={<></>}
          color={element.status ? 'green' : 'orange'}
          classNames={{ iconWrapper: classes.iconWrapper }}
          variant="light"
        >
          Completed
        </Chip>
      </Table.Td>
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
      <Table.Td>
        <Button
          onClick={() => {
            open();
            setEditIndex(index);
            setIsEdit(true);
          }}
          variant="transparent"
        >
          <IconMessage color="#DBDBDB" />
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
                Brand Name {sortDirection === 'asc' ? '▲' : '▼'}
              </Button>
            </Table.Th>
            <Table.Th>Number of Products</Table.Th>
            <Table.Th>Number of Components</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Edit</Table.Th>
            <Table.Th>Contact</Table.Th>
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
        <AddNewBrand
          rowData={editIndex !== null ? sortedElements[editIndex] : undefined}
          updateEditHandler={updateEditHandler}
          onClose={close}
          isEdit={isEdit}
        />
      </Modal>
    </Box>
  );
};

export default BrandList;
