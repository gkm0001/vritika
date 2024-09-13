import dayjs from 'dayjs';
import { useState } from 'react';
import {
  IconEdit,
  IconFileBarcode,
  IconFilter,
  IconInfoCircle,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
// import { format } from 'date-fns';
import { Box, Button, Checkbox, Group, Modal, Table, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import EditProductPriceData from './EditProductPriceData';
import { elements } from './priceManagementData';
import classes from './PriceManagement.module.css';

const ProductPriceTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedElements, setSortedElements] = useState(elements);
  const [opened, { open, close }] = useDisclosure(false);
  const [editIndex, setEditIndex] = useState<null | number>(null);

  const toggleAllRowsSelection = (event: any) => {
    if (event.target.checked) {
      setSelectedRows([...Array(elements.length).keys()]);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSort = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    const sorted = [...sortedElements].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.productComponent.localeCompare(b.productComponent);
      }
      return b.productComponent.localeCompare(a.productComponent);
    });
    setSortedElements(sorted);
  };

  const handleDelete = () => {
    // Filter out the selected rows
    const updatedElements = sortedElements.filter((_, index) => !selectedRows.includes(index));
    setSortedElements(updatedElements);
    setSelectedRows([]); // Optionally clear selected rows after deletion
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
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, index]
                : selectedRows.filter((position) => position !== index)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.productComponent}</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>{element.currentPrice}</Table.Td>
      <Table.Td>{dayjs(element.lastUpdated).format('DD-MMM-YYYY')}</Table.Td>
      <Table.Td>
        <Button
          onClick={() => {
            open();
            setEditIndex(index);
          }}
          variant="transparent"
        >
          <IconEdit color="#DBDBDB" />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box m="md" p="md" bg="#fff" className={classes.main}>
      <Group mb={30} justify="space-between" wrap="wrap">
        <Title c="#2B3674">Sales Data Table</Title>
        <Group>
          <TextInput
            radius={20}
            classNames={{ input: classes.searchinput }}
            leftSection={<IconSearch />}
            placeholder="Search"
          />
          <Button variant="light" bg="#F4F7FE" p={3}>
            <IconFilter />
          </Button>
          <Button.Group classNames={{ group: classes.group }}>
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
        </Group>
      </Group>
      <Table border={5} withTableBorder horizontalSpacing="md">
        <Table.Thead bg="#EEF2FF">
          <Table.Tr>
            <Table.Th>
              <Checkbox onChange={toggleAllRowsSelection} label="#" />
            </Table.Th>
            <Table.Th>
              <Button variant="transparent" c="#000" onClick={handleSort}>
                Product/Component {sortDirection === 'asc' ? '▲' : '▼'}
              </Button>
            </Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Current Price (INR)</Table.Th>
            <Table.Th>Last Updated</Table.Th>
            <Table.Th>Edit</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Modal opened={opened} onClose={close} title="Edit Data" c="brand">
        <EditProductPriceData rowData={sortedElements[editIndex || 0]} />
      </Modal>
    </Box>
  );
};

export default ProductPriceTable;
