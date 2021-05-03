import React from 'react';

import {connect} from "react-redux";
import HomePage from "./HomePage";
import USER_ACTIONS from "../../../redux/actions/users";

const HomePageContainer = ({currentDialogId, logout}) => {
    return (
        <HomePage currentDialogId={currentDialogId}
                  logout={logout}
        />
    );
}

const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId


const mapStateToProps = (state) => ({
    currentDialogId: selectCurrentDialogId(state),
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(USER_ACTIONS.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);