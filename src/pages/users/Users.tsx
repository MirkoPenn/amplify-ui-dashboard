import React, { useEffect, useState } from "react";
import {
  Button,
  Heading,
  Loader,
  ScrollView,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  View,
  Icon
} from "@aws-amplify/ui-react";
import "./Users.css";
import { Modal } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import CreateUserForm from "./CreateUserForm";
import ModifyUserForm from "./ModifyUserForm";
import { deleteUserAPI, getUsersListAPI } from "../../data/api";

export interface User {
  sub: string;
  username: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface UsersTableProps {
  users?: User[];
}

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // create modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const closeCreateModal = () => setShowCreateModal(false);
  const openCreateModal = () => setShowCreateModal(true);

  // modify modal
  const [showModifyModal, setShowModifyModal] = useState(false);
  const closeModifyModal = () => setShowModifyModal(false);
  const openModifyModal = () => setShowModifyModal(true);
  const [modifyItem, setModifyItem] = useState({});

  const getUsersList = async () => {
    setLoading(true)
    try {
      const usersList = await getUsersListAPI();
      setUsers(usersList)
      setLoading(false);
    } catch (e) {
      console.log('Could not load users list: ', e);
      setLoading(false);
    }
  };

  const deleteUser = async (username) => {
    setLoading(true);
    try {
      await deleteUserAPI(username);
      getUsersList()
    } catch (e) {
      console.log('Cannot delete user: ', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      <div>
        <h2>Gestione utenti</h2>
      </div>

      <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
      >
        <Button onClick={openCreateModal}>Crea utente</Button>
        <br/>
        <br/>
        <Modal show={showCreateModal} onHide={closeCreateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Creazione utente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateUserForm onCreate={() => {closeCreateModal(); getUsersList();}}></CreateUserForm>
          </Modal.Body>
        </Modal>
        <Modal show={showModifyModal} onHide={closeModifyModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica utente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModifyUserForm onModify={() => {closeModifyModal(); getUsersList();}} item={modifyItem}></ModifyUserForm>
          </Modal.Body>
        </Modal>
        <ScrollView width="100%">
          {loading ? <Loader/> : 
            <Table caption="" highlightOnHover={false}>
              <TableHead>
                <TableRow>
                  <TableCell as="th">Username</TableCell>
                  <TableCell as="th">Nome e cognome</TableCell>
                  <TableCell as="th">Email</TableCell>
                  <TableCell as="th">Ruolo</TableCell>
                  <TableCell as="th"></TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {users?.map((item) => {
                    return (
                      <TableRow key={item.sub}>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>
                          <Icon as={MdEdit} onClick={() => {setModifyItem(item); openModifyModal();}}/>
                          <Icon as={MdDelete} onClick={() => deleteUser(item.username)}/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
            </Table>
          }
        </ScrollView>
      </View>
    </>
  );
};

export default Users;
