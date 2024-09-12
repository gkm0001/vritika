import dayjs from 'dayjs';
import { useState } from 'react';
import {
  IconDots,
  IconFileBarcode,
  IconInfoCircle,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
// import { format } from 'date-fns';
import { Box, Button, Checkbox, Chip, Group, Table, TextInput, Title } from '@mantine/core';
import classes from './DataTable.module.css';

const elements = [
  {
    'Date/Time': new Date(2024, 7, 28, 10, 45),
    mass: 12.011,
    symbol: 'C',
    name: 'Carbon',
    status: true,
  },
  {
    'Date/Time': new Date(2024, 5, 28, 10, 45),
    mass: 14.007,
    symbol: 'N',
    name: 'Nitrogen',
    status: false,
  },
  {
    'Date/Time': new Date(2024, 7, 12, 10, 45),
    mass: 88.906,
    symbol: 'Y',
    name: 'Yttrium',
    status: true,
  },
  {
    'Date/Time': new Date(2024, 7, 28, 5, 45),
    mass: 137.33,
    symbol: 'Ba',
    name: 'Barium',
    status: false,
  },
  {
    'Date/Time': new Date(2024, 7, 28, 10, 45),
    mass: 140.12,
    symbol: 'Ce',
    name: 'Cerium',
    status: true,
  },
];

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedElements, setSortedElements] = useState(elements);

  const toggleAllRowsSelection = (event: any) => {
    if (event.target.checked) {
      setSelectedRows([...Array(elements.length).keys()]);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSort = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    const sorted = [...elements].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a['Date/Time'].getTime() - b['Date/Time'].getTime();
      }
      return b['Date/Time'].getTime() - a['Date/Time'].getTime();
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
      <Table.Td>{dayjs(element['Date/Time']).format('DD-MMM-YYYY hh:mm A')}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>
        <Chip checked={element.status} color={element.status ? 'green' : 'red'} variant="light">
          Completed
        </Chip>
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
            <IconDots color="#10B981" />
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
                Date/Time {sortDirection === 'asc' ? '▲' : '▼'}
              </Button>
            </Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
};

export default DataTable;
