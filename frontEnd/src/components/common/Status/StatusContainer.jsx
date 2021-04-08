import React from "react";
import {connect} from "react-redux";
import Status from "./Status";

const StatusContainer = ({currentDialogId, items, currentUserData, isReady}) => {

    let partner = {};

    if (isReady && currentDialogId) {
        const currentDialogObj = items.filter(
            dialog => dialog._id === currentDialogId
        )[0];

        if (currentDialogObj.author._id === currentUserData._id) {
            partner = currentDialogObj.partner;
        } else {
            partner = currentDialogObj.author;
        }
    }

    return (
        <Status online={partner.isOnline} fullname={partner.fullname}/>
    )
}

const selectDialogs = state => state.dialogsReducer.items
const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId
const selectCurrentUserData = state => state.usersReducer.currentUserData
const selectIsReady = state => state.dialogsReducer.isReady

const mapStateToProps = (state) => ({
    items: selectDialogs(state),
    currentDialogId: selectCurrentDialogId(state),
    currentUserData: selectCurrentUserData(state),
    isReady: selectIsReady(state),
});

export default connect(mapStateToProps, null)(StatusContainer)