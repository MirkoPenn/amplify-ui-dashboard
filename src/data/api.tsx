import { Amplify } from "aws-amplify";
import config from "../apiconfig.json"
import { get, post, del, put, patch } from 'aws-amplify/api';

// get list of users in the cognito pool
export const getUsersListAPI = async () => {
    return getAPI('/users');
}

// change attributes for the specified user
export const modifyUserAPI = async (username, email, name, role) => {
    return patchAPI('/users/'+username, {body: {
        email: email, 
        email_verified: "true",
        name: name, 
        ["custom:role"]: role
    }});
}

// create a new user in the user pool
export const createUserAPI = async (username, email, temp_password, name, role) => {
    return putAPI('/users', {body: {
        username: username, 
        email: email, 
        temp_password: temp_password, 
        name: name, 
        role: role
    }});
}

// create a new user in the user pool
export const deleteUserAPI = async (username) => {
    return delAPI('/users/'+username);
}

// GET call
const getAPI = async (path, options?) => {
    try {
        const response = await get({ 
        apiName: config.name,
        path: path,
        options: options
        }).response;
        const body = JSON.parse(((await response.body.json()) as any).body)
        if(body.error){
          throw Error(body.error);
        }
        return body;
    } catch (e) {
        console.log('GET call failed: ', e);
        throw e;
    }
};

// POST call
const patchAPI = async (path, options?) => {
    try {
      await patch({ 
        apiName: config.name,
        path: path,
        options: options
      }).response;
    } catch (e) {
      console.log('PATCH call failed: ', e);
      throw e;
    }
};

// PUT call
const putAPI = async (path, options?) => {
    try {
      const response = await put({ 
        apiName: config.name,
        path: path,
        options: options
      }).response;
      const body = await JSON.parse(((await response.body.json()) as any).body);
      if(body.error){
        throw Error(body.error);
      }
      return body;
    } catch (e) {
      console.log('PUT call failed: ', e);
      throw e;
    }
  };

// DELETE call
const delAPI = async (path, options?) => {
    try {
    const response = await del({ 
        apiName: config.name,
        path: path,
        options: options
    }).response;
    if(response.statusCode > 299){
        throw Error();
    }
    } catch (e) {
        console.log('DELETE call failed: ', e);
        throw e;
    }
};

// function that adds the API to the current amplify configuration
export const configureApi = () => {
    const existingConfig = Amplify.getConfig();
    Amplify.configure({
      ...existingConfig,
      API: {
        ...existingConfig.API,
        REST: {
          ...existingConfig.API?.REST,
          [config.name]: {
            endpoint: config.endpoint + config.env,
            region: config.region
          }
        }
      }
    });
}