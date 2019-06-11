import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Student from './Students';
import * as studentActions from "./actions/RootAction";

const actions = {
  ...studentActions
};

const mapStateToProps = (state) => ({
    students: state.students
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Student);

