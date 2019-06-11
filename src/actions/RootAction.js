import { ADD_STUDENT, REMOVE_STUDENT, EDIT_STUDENT } from "../constants/action-types";

export function addStudent(payload) {
  return { type: ADD_STUDENT, payload };
}

export function removeStudent(payload) {
  return { type: REMOVE_STUDENT, payload };
}

export function editStudent(payload) {
  return { type: EDIT_STUDENT, payload };
}