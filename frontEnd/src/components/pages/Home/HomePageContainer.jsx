import React from 'react';

import {connect} from "react-redux";
import HomePage from "./HomePage";

const HomePageContainer = ({currentDialogId}) => {
    return (
        <HomePage currentDialogId={currentDialogId}/>
    );
}

const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId

const mapStateToProps = (state) => ({
    currentDialogId: selectCurrentDialogId(state),
});

export default connect(mapStateToProps, null)(HomePageContainer);