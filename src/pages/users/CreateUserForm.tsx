import React, { useState } from "react";
import {
  Button,
  Flex,
  Loader,
  Radio,
  RadioGroupField,
  TextField,
  Text,
  PasswordField,
} from "@aws-amplify/ui-react";
import "./Users.css";
import { createUserAPI } from "../../data/api";

const CreateUserForm = (props) => {
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);

  // create user form data
  const [createUserFormValues, setCreateUserFormValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    ruolo: "",
  });
  const changeInputCreateUserForm = (e) => {
    const { name, value } = e.target;
    setCreateUserFormValues({
      ...createUserFormValues,
      [name]: value,
    });
  };

  const createUser = async () => {
    try{
      setLoadingCreate(true);
      setErrorCreate(false);
      await createUserAPI(createUserFormValues.username, createUserFormValues.email, createUserFormValues.password, createUserFormValues.name, createUserFormValues.ruolo);
      setLoadingCreate(false);
      props.onCreate();
    } catch (e) {
      console.log('Create user failed ', e);
      setErrorCreate(true);
      setLoadingCreate(false);
    }
  };

  return (
    <Flex as="form" direction="column" width="100%" onSubmit={(e) => {e.preventDefault(); createUser();}}>
      <TextField
        value={createUserFormValues.username}
        onChange={changeInputCreateUserForm}
        name="username"
        label={
          <Text>
            <b>Username</b>
          </Text>
        }
        type="text"
        isRequired={true}
      />
      <TextField
        value={createUserFormValues.name}
        onChange={changeInputCreateUserForm}
        name="name"
        label={
          <Text>
            <b>Nome e cognome</b>
          </Text>
        }
        type="text"
        isRequired={true}
        autoComplete="new-password"
      />
      <TextField
        value={createUserFormValues.email}
        onChange={changeInputCreateUserForm}
        name="email"
        label={
          <Text>
            <b>Email</b>
          </Text>
        }
        type="email"
        isRequired={true}
        autoComplete="new-password"
      />

      <PasswordField
        value={createUserFormValues.password}
        onChange={changeInputCreateUserForm}
        name="password"
        label={
          <Text>
            <b>Password temporanea</b>
          </Text>
        }
        isRequired={true}
        autoComplete="new-password"
      />
      <RadioGroupField
        legend={
          <Text>
            <b>Ruolo</b>
          </Text>
        }
        name="ruolo"
        value={createUserFormValues.ruolo}
        onChange={changeInputCreateUserForm}
        isRequired={true}
      >
        <Radio value="admin">Amministratore</Radio>
        <Radio value="user">Utente</Radio>
      </RadioGroupField>
      <Button
        type="submit"
        variation="primary"
        width={{ base: "100%", large: "100%" }}
        disabled={loadingCreate}
      >
        {loadingCreate ? <Loader/> : "Crea utente"}
      </Button>
      { errorCreate ? <span style={{color: "red", marginLeft: "auto"}}>Errore nella creazione dell'utente!</span> : ""}
    </Flex>
  );
};

export default CreateUserForm;
