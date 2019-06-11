import Reactfrom 'react';
import { SelectionState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import { Button, Paper, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel } from '@material-ui/core';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

const errors = {
  isEmailError: false,
  isPasswordError: false,
  isRetypePasswordError: false,
  isGenderError: false,
  isCountryError: false,
  isHobbyError: false,
  isFormEmpty: false
}
const columns = [
  { name: 'Email', title: 'Email' },
  { name: 'Gender', title: 'Gender' },
  { name: 'Country', title: 'Country' },
  { name: 'Hobby', title: 'Hobby' }
]

const fields = {
  country: '',
  gender: '',
  hobbies: [],
  email: '',
  password: '',
  rePassword: '',
  showAPI: false
}

class Student extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns,
      students: this.props.students,
      selection: [],
      showForm: false,
      editForm: false,
      ...fields,
      ...errors

    };

    this.changeSelection = selection => {
      this.setState({ selection });
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({selection: []})
    this.setState({
      students: nextProps.students
    })
  }

  handleAddClick = () => {
    this.clearErrorState();
    this.setState({ editForm: false });

    var Gender= (this.state.gender == "" || null || undefined ? "Male" : this.state.gender);
    var Country = (this.state.country == "" || null || undefined ? "India": this.state.country);

    var isValid = this.validateForm();
    if (isValid) {
      var student = {
        Email: this.state.email,
        Gender: Gender,
        Country: Country,
        Hobby: this.state.hobbies,
        Password: this.state.password,
        ReTypePassword: this.state.rePassword
      }
      this.props.addStudent(student);
      this.setState({ showForm: false });
    }
  }

  handleEditClick = () => {
    this.clearErrorState();
    this.setState({ editForm: true });

    if (this.state.selection.length == 1) {

      var selectedStudent = this.state.selection[0];
      const student = this.props.students[selectedStudent];

      this.setState({
        email: student.Email, gender: student.Gender,
        country: student.Country, hobbies: student.Hobby,
        password: student.Password, rePassword: student.ReTypePassword
      });

      this.forceUpdate();
      this.setState({ showForm: true });
    }
  }

  clearErrorState = () => {
    this.setState({ isEmailError: false, isCountryError: false, isGenderError: false, isHobbyError: false, isPasswordError: false, isFormEmpty: false });
  }

  validateForm = () => {    
    this.clearErrorState();

    var isFormEmpty = false;
    if (this.state.email == ""  || this.state.password == "" || this.state.password == "") {
      isFormEmpty = true;
    }

    var isEmailError = false;
    if (this.state.email !== "" && this.state.email !== undefined) {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

      if (!pattern.test(this.state.email)) {
        isEmailError = true
      }
    }

    var isPasswordError = false;
    if (this.state.password !== this.state.rePassword) {
      isPasswordError = true ;
    }

    var isHobbyError = false;
    if (this.state.hobbies.length < 2) {
      isHobbyError =  true ;
    }
    this.setState({ isFormEmpty, isHobbyError, isPasswordError, isEmailError });

    return (!isFormEmpty && !isHobbyError && !isPasswordError && !isEmailError );
  }

  handleDeleteClick = () => {
    this.props.removeStudent(this.state.selection)
  }

  handleEditSubmit = () => {
    var students = this.state.students;
    var studentNew = {
      Email: this.state.email,
      Gender: this.state.gender,
      Country: this.state.country,
      Hobby: this.state.hobbies,
      Password: this.state.password,
      ReTypePassword: this.state.rePassword
    }
    this.clearErrorState();
    var isValid = this.validateForm();

    if (isValid) {
      var index = this.state.selection[0];
      students = this.props.editStudent([studentNew, index]);
      this.setState({ showForm: false });
    }
  }

  handleForm = (value) => {
    this.setState({ editForm: false });
    this.setState({ email: '', gender: '', country: '', hobbies: '', password: '', rePassword: '' })
    this.setState({ showForm: value });
  }

  handleCountryChange = (event) => {
    this.setState({ country: event.target.value });
  }

  onGenderChange = (value) => {
    this.setState({ gender: value });
  }

  hobbiesChanged = (newValues) => {
    this.setState({ hobbies: newValues });
  }

  emailChangeHandler = (event) => {
    this.setState({ email: event.target.value })
  }

  passwordChangeHandler = (event) => {
    this.setState({ password: event.target.value })
  }

  rePpasswordChangeHandler = (event) => {
    this.setState({ rePassword: event.target.value })
  }

  handleAPI = () => {
    this.setState({ showAPI: true })
  }

  render() {

    const { students, columns, selection, email } = this.state;

    return (
      <div>
        <div style={{ fontSize: "30px", margin: "10px", textAlign: "center" }}>
          Social Pilot Student Management System
        </div>
        <div style={{ height: "40px", span: "5px", width: "80%", margin: 'auto', marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            onClick={() => this.handleForm(true)}
          >
            Add Student
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{ width: "155px", display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            disabled={this.state.selection.length !== 1}
            onClick={() => this.handleEditClick()}
          >
            Edit Student
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ display: "inline-block", marginTop: "10px", marginLeft: "28px" }}
            onClick={() => this.handleDeleteClick()}
          >
            <span style={{ cursor: "pointer" }}>
              Delete Student
          </span>
          </Button>
        </div>

        <Paper style={{ width: "80%", margin: 'auto' }}>
          <Grid
            rows={this.state.students}
            columns={columns}
          >
            <SelectionState
              selection={selection}
              onSelectionChange={this.changeSelection}
            />
            <Table />
            <TableHeaderRow />
            <TableSelection />
          </Grid>

          {this.state.showForm == true &&
            <Dialog
              style={{ width: "100%" }}
              open={this.state.showForm}
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
              <DialogContent>

                <DialogContentText>
                  Add the student details in given below form. Please fill the details carefully.

                  {this.state.isEmailError &&
                    <p style={{ fontSize: '15px', color: 'red' }}>
                      Note: Please type valid email adress
                      <br /></p>}

                  {this.state.isPasswordError &&
                    <p style={{ fontSize: '15px', color: 'red' }}>
                      Note: Password does not match
                      <br /></p>}

                  {this.state.isFormEmpty &&
                    <p style={{ fontSize: '15px', color: 'red' }}>
                      Note: All fields are mendatory
                  <br /></p>}

                  {this.state.isHobbyError &&
                    <p style={{ fontSize: '15px', color: 'red' }}>
                      Note: Please select atleast two hobbies
                      <br /></p>}

                </DialogContentText>

                <TextField autoFocus margin="dense"
                  id="email"
                  label="Email Adress:"
                  type="email"
                  style={{ width: "70%" }}
                  fullWidth
                  onChange={(event) => this.emailChangeHandler(event)}
                  value={this.state.email}
                >

                </TextField><br /><br />

                <TextField autoFocus margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  style={{ width: "70%" }}
                  onChange={(event) => this.passwordChangeHandler(event)}
                  value={this.state.password}
                >
                </TextField><br /><br />

                <TextField autoFocus margin="dense"
                  id="password"
                  label="Retype Password"
                  type="password"
                  style={{ width: "70%" }}
                  onChange={(event) => this.rePpasswordChangeHandler(event)}
                  value={this.state.rePassword}
                >
                </TextField><br /><br />

                <div style={{ marginBottom: "3%" }}>
                  <InputLabel
                    style={{ width: "20%", display: 'inline' }} >
                    Country:
               </InputLabel>

                  <select
                    style={{
                      width: "182px", display: 'inline', height: '54px', marginLeft: '20px', cursor: 'pointer', borderColor: 'rgb(224, 224, 224)', borderRadius: '1px'
                    }}
                    value={this.state.country} onChange={this.handleCountryChange}
                  >
                    <option value="India">India</option>
                    <option value="U.S.A.">U.S.A.</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div style={{ width: '49.4%' }}>
                  <InputLabel
                    style={{ width: "20%", display: 'inline', marginBottom: '15px' }} >
                    Gender:
               </InputLabel>

                  <RadioGroup
                    onChange={this.onGenderChange}
                    horizontal
                    value={this.state.gender}
                  >
                    <RadioButton value="Male">
                      Male
              </RadioButton>
                    <RadioButton value="Female">
                      Female
            </RadioButton>
                  </RadioGroup>
                </div>

                <div
                  style={{ marginTop: '15px' }}
                >
                  <InputLabel
                    style={{ width: "20%", display: 'inline', marginBottom: '15px' }} >
                    Hobbies:
               </InputLabel>
                  <CheckboxGroup
                    name="hobbies"
                    checkboxDepth={2}
                    value={this.state.hobbies}
                    onChange={this.hobbiesChanged}>
                    <label><Checkbox value=" Travel " />Travel</label>
                    <label><Checkbox value=" Dance " />Dance</label>
                    <label><Checkbox value=" singing " />Singing</label>
                    <label><Checkbox value=" Painting " />Painting</label>
                  </CheckboxGroup>
                </div>

              </DialogContent>

              <DialogActions >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.state.editForm ? () => this.handleEditSubmit() : () => this.handleAddClick()}
                  disabled={this.props.Edit}>
                  Submit
         </Button>

                <Button
                  variant="contained"
                  color="primary" onClick={() => this.handleForm(false)}
                >
                  Close
         </Button>
              </DialogActions>
            </Dialog >
          }
        </Paper>
      </div>
    );
  }
}

export default Student;
