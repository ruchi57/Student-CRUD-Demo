import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class FormComponent extends Component {
    constructor(props) {
        super(props);
    }

    handleClose() {
        this.props.showForm = false;
    }

    render() {
        return (
            <Dialog style = {{width: "100%"}} open={this.props.showForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                <DialogContent>
                    {/* email, password, retype password, gender, hobby, country   */}

                    <TextField autoFocus margin="dense"
                        id="email"
                        label="Email Adress:"
                        type="email"
                        fullWidth
                    //  onChange={(event) => this.props.emailChangeHandler(event)}
                    // value={this.props.EmailAdress}
                    >

                    </TextField><br /><br />

                    <TextField autoFocus margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                    >
                    </TextField><br /><br />

                    <TextField autoFocus margin="dense"
                        id="password"
                        label="Retype Password"
                        type="password"
                    >
                    </TextField><br /><br />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary" onClick={this.props.handleAddEmployeeClick}
                        disabled={this.props.Edit}>
                        Submit
                </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.props.Edit}
                        onClick={this.props.handleEditEmployee}>
                        Edit
                </Button>
                    <Button
                        variant="contained"
                        color="primary" onClick={this.props.handleCloseForm}
                    >
                        Close
                </Button>
                </DialogActions>
            </Dialog >);
    }
}

export default FormComponent;