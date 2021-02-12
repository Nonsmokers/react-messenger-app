import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import actions from "../../../redux/actions/dialogs";
import Sidebar from "./Sidebar";

const SidebarContainer = (props) => {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([...props.items]);

    const filterUsersByName = (arr, name) => {
        setFiltered(arr.filter(function (element) {
            return element.user.fullname.toLowerCase().includes(name.toLowerCase());
        }))
    }

    const debounce = (fn, ms) => {
        let timeout;
        return function () {
            const later = () => {
                fn.apply(this, arguments)
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, ms);
        };
    }

    const onSearch = debounce(() => {
        filterUsersByName(props.items, search)
    }, 1500)


    useEffect(() => {
        onSearch(search)
    }, []);

    return (
        <Sidebar search={search}
                 setSearch={setSearch}
                 filtered={filtered}
        />
    );
}
const selectDialogs = state => state.dialogsReducer.items

const mapStateToProps = (state) => ({
    items: selectDialogs(state),
});

const mapDispatchToProps = (dispatch) => ({
    setDialogs: dialogs => dispatch(actions.fetchAllDialogs(dialogs))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);