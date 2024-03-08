import React, { useState } from "react";
import { Box, Button, Container, Heading, IconButton, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, VStack, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

const fakeData = [
  {
    id: 1,
    articolo: "Mouse Wireless",
    tipo: "IN",
    quantità: 20,
    motivo: "Riassortimento",
    data: "2023-04-01",
    utente: "Mario Rossi",
  },
  // ... more fake data
];

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movements, setMovements] = useState(fakeData);

  const handleDelete = (id) => {
    setMovements((prev) => prev.filter((movement) => movement.id !== id));
  };

  const renderTableData = () => {
    return movements.map((movement) => (
      <Tr key={movement.id}>
        <Td>{movement.articolo}</Td>
        <Td>{movement.tipo}</Td>
        <Td>{movement.quantità}</Td>
        <Td>{movement.motivo}</Td>
        <Td>{movement.data}</Td>
        <Td>{movement.utente}</Td>
        <Td>
          <IconButton icon={<FaEdit />} aria-label="Edit" size="sm" mr={2} />
          <IconButton icon={<FaTrashAlt />} aria-label="Delete" size="sm" colorScheme="red" onClick={() => handleDelete(movement.id)} />
        </Td>
      </Tr>
    ));
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} my={8}>
        <Heading>Gestione Movimentazioni di Inventari</Heading>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
          <Input type="text" placeholder="Cerca movimentazioni..." />
        </InputGroup>
        <Box alignSelf="flex-end">
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
            Registra Movimentazione
          </Button>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Articolo</Th>
              <Th>Tipo</Th>
              <Th>Quantità</Th>
              <Th>Motivo</Th>
              <Th>Data</Th>
              <Th>Utente</Th>
              <Th>Azioni</Th>
            </Tr>
          </Thead>
          <Tbody>{renderTableData()}</Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registra una nuova movimentazione</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Articolo</FormLabel>
              <Input placeholder="Inserisci l'articolo" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Tipo</FormLabel>
              <Select placeholder="Seleziona tipo">
                <option value="IN">IN (Entrata)</option>
                <option value="OUT">OUT (Uscita)</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Quantità</FormLabel>
              <Input placeholder="Inserisci la quantità" type="number" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Motivo</FormLabel>
              <Input placeholder="Inserisci il motivo" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Data</FormLabel>
              <Input placeholder="Seleziona la data" type="date" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Salva
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Annulla
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
