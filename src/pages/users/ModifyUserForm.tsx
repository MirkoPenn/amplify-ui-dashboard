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
import { modifyUserAPI } from "../../data/api";

const ModifyUserForm = (props) => {
  const [loadingModify, setLoadingModify] = useState(false);
  const [errorModify, setErrorModify] = useState(false);

  // Modify user form data
  const [modifyUserFormValues, setModifyUserFormValues] = useState({
    username: props.item.username,
    name: props.item.name,
    email: props.item.email,
    role: props.item.role,
  });
  const changeInputModifyUserForm = (e) => {
    const { name, value } = e.target;
    setModifyUserFormValues({
      ...modifyUserFormValues,
      [name]: value,
    });
  };

  const modifyUser = async () => {
    try{
      setLoadingModify(true);
      setErrorModify(false);
      await modifyUserAPI(modifyUserFormValues.username, modifyUserFormValues.email, modifyUserFormValues.name, modifyUserFormValues.role);
      setLoadingModify(false);
      props.onModify();
    } catch (e) {
      console.log('Modify user failed ', e);
      setErrorModify(true);
      setLoadingModify(false);
    }
  };

  return (
    <Flex as="form" direction="column" width="100%" onSubmit={(e) => {e.preventDefault(); modifyUser();}}>
      <TextField
        value={modifyUserFormValues.username}
        onChange={changeInputModifyUserForm}
        name="username"
        label={
          <Text>
            <b>Username</b>
          </Text>
        }
        disabled={true}
        type="text"
        isRequired={true}
      />
      <TextField
        value={modifyUserFormValues.name}
        onChange={changeInputModifyUserForm}
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
        value={modifyUserFormValues.email}
        onChange={changeInputModifyUserForm}
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
      <RadioGroupField
        legend={
          <Text>
            <b>Ruolo</b>
          </Text>
        }
        name="role"
        value={modifyUserFormValues.role}
        onChange={changeInputModifyUserForm}
        isRequired={true}
      >
        <Radio value="admin">Amministratore</Radio>
        <Radio value="user">Utente</Radio>
      </RadioGroupField>
      <Button
        type="submit"
        variation="primary"
        width={{ base: "100%", large: "100%" }}
        disabled={loadingModify}
      >
        {loadingModify ? <Loader/> : "Modifica utente"}
      </Button>
      { errorModify ? <span style={{color: "red", marginLeft: "auto"}}>Errore nella modifica dell'utente!</span> : ""}
    </Flex>
  );
};

export default ModifyUserForm;
