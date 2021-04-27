import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import socket from '../../../config/socket'
import DIALOGS_ACTIONS from "../../../redux/actions/dialogs";
import Sidebar from "./Sidebar";

const SidebarContainer = ({items, setCurrentDialogId, currentDialogId, fetchDialogs, isReady, currentUserData}) => {

    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([...items]);
    const [currentUserId, setCurrentUserId] = useState('');


    const filterUsersByName = (arr, name) => {
        setFiltered(arr.filter((element) => {
            return element.partner.fullname.toLowerCase().includes(name.toLowerCase());
        }))
    }
    useEffect(() => {
        filterUsersByName(items, search)
    }, [search]);

    useEffect(() => {
        if(!isReady){
            fetchDialogs()
        }
        setFiltered(items)

        socket.on('SERVER:NEW_MESSAGE', fetchDialogs)
        socket.on('SERVER:DIALOG_CREATED', fetchDialogs)
        return () => {
            socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs)
            socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs)
        }
    }, [items]);

    useEffect(() => {
        if (currentUserData) {
            setCurrentUserId(currentUserData._id)
        }
    }, [currentUserData]);

    return (
        <Sidebar search={search}
                 setSearch={setSearch}
                 filtered={filtered}
                 onSelectDialog={setCurrentDialogId}
                 currentDialogId={currentDialogId}
                 currentUserId={currentUserId}
                 currentUserData={currentUserData}
        />
    );
}
const selectDialogs = state => state.dialogsReducer.items
const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId
const selectCurrentIsReady = state => state.dialogsReducer.isReady
const selectCurrentUserData = state => state.usersReducer.currentUserData

const mapStateToProps = (state) => ({
    items: selectDialogs(state),
    currentDialogId: selectCurrentDialogId(state),
    isReady: selectCurrentIsReady(state),
    currentUserData: selectCurrentUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchDialogs: dialogs => dispatch(DIALOGS_ACTIONS.fetchAllDialogs(dialogs)),
    setCurrentDialogId: dialog => dispatch(DIALOGS_ACTIONS.setCurrentDialogId(dialog))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);