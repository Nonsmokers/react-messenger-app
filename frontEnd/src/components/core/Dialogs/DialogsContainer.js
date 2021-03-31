import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import socket from '../../../config/socket'
import DIALOGS_ACTIONS from "../../../redux/actions/dialogs";
import Dialogs from "./Dialogs";

const DialogsContainer = ({items, setCurrentDialogId, currentDialogId, fetchDialogs, currentUserId}) => {

    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([...items]);

    const filterUsersByName = (arr, name) => {
        setFiltered(arr.filter((element) => {
            return element.partner.fullname.toLowerCase().includes(name.toLowerCase());
        }))
    }
    useEffect(() => {
        filterUsersByName(items, search)
    }, [search]);

    useEffect(() => {
        !items.length ? fetchDialogs() : setFiltered(items)
        socket.on('SERVER:DIALOG_CREATED', (data)=>{
            console.log(data)
            fetchDialogs()
        })
    }, [items]);

    return (
        <Dialogs items={items}
                 search={search}
                 setSearch={setSearch}
                 filtered={filtered}
                 onSelectDialog={setCurrentDialogId}
                 currentDialogId={currentDialogId}
                 currentUserId={currentUserId}
        />
    );
}
const selectDialogs = state => state.dialogsReducer.items
const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId

const mapStateToProps = (state) => ({
    items: selectDialogs(state),
    currentDialogId: selectCurrentDialogId(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchDialogs: dialogs => dispatch(DIALOGS_ACTIONS.fetchAllDialogs(dialogs)),
    setCurrentDialogId: dialog => dispatch(DIALOGS_ACTIONS.setCurrentDialogId(dialog))
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);