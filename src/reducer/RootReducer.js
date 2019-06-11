import { ADD_STUDENT, REMOVE_STUDENT, EDIT_STUDENT } from "../constants/action-types";


const initialState = {
  students: [
    { Email: "Ruchi@gmail.com", Gender: "Female", Country: "India", Hobby: [" Travel, Dance "], Password: "123", ReTypePassword: "123" },
    { Email: "Maya@gmail.com", Gender: "Female", Country: "India", Hobby: [" Dance, Travel "], Password: "123", ReTypePassword: "123" },
  ]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STUDENT: {

      return Object.assign({}, state, {
        students: state.students.concat(action.payload)
      });
    }

    case REMOVE_STUDENT: {
      var studentsNew = state.students.filter(function (value, index) {
        return action.payload.indexOf(index) == -1;
      });
      return Object.assign({}, state, {
        students: studentsNew
      });
    }

    case EDIT_STUDENT: {
      var student = state.students;

      var studentNew = action.payload[0];

      var index = action.payload[1];

      student[index] = studentNew;

      return Object.assign({}, state, {
        students: student
      });
    }
  }
  return state;
}

export default rootReducer;