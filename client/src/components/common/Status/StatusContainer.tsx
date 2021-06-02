import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import Status from "./Status"
import {RootStateType} from '../../../redux/rootReducer'

const StatusContainer: React.FC = () => {

    const items = useSelector(selectDialogs)
    const currentUserData = useSelector(selectCurrentUserData)
    const currentDialogId = useSelector(selectCurrentDialogId)
    const isReady = useSelector(selectCurrentIsReady)

    const [partner, setPartner] = useState<any>({})

    useEffect(() => {
        if (isReady && currentDialogId) {
            const currentDialogObj = items.filter(
                (dialog) => dialog._id === currentDialogId
            )[0]
            try {
                if (currentUserData !== null) {
                    if (currentDialogObj.author.id === currentUserData._id) {
                        setPartner(currentDialogObj.partner);
                    } else {
                        setPartner(currentDialogObj.author);
                    }
                }
            } catch {
                console.log('currentUserData === null')
            }
        }
    }, [currentDialogId])


    return (
        <Status online={partner.isOnline} fullname={partner.fullname}/>
    )
}
const selectDialogs = (state: RootStateType) => state.dialogsReducer.items
const selectCurrentDialogId = (state: RootStateType) => state.dialogsReducer.currentDialogId
const selectCurrentUserData = (state: RootStateType) => state.usersReducer.currentUserData
const selectCurrentIsReady = (state: RootStateType) => state.dialogsReducer.isReady

export default StatusContainer