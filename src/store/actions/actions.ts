import {
  ADD_IMAGE,
  FETCH_DATA_ERROR,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  EDIT_IMAGE,
  REMOVE_IMAGE,
  ADD_USER,
  REMOVE_USER,
} from "./actionTypes";
export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};
export const fetchDataSuccess = (data: []) => {
  return {
    type: FETCH_DATA_SUCCESS,
    data: data,
  };
};
export const fetchDataError = (error: string) => {
  return {
    type: FETCH_DATA_ERROR,
    payload: error,
  };
};

export const addImage = (userData: {}) => {
  return {
    type: ADD_IMAGE,
    userData: userData,
  };
};
export const editImage = (userData: {}) => {
  return {
    type: EDIT_IMAGE,
    userData: userData,
  };
};
export const removeImage = (userData: {}) => {
  return {
    type: REMOVE_IMAGE,
    userData: userData,
  };
};
export const addUser = (userData: {}) => {
  return {
    type: ADD_USER,
    userData: userData,
  };
};
export const removeUser = () => {
  return {
    type: REMOVE_USER,
    userData: {},
  };
};
