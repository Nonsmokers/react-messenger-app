import React, {useEffect, useState} from 'react'
import {Result, Spin} from 'antd'
import Block from '../../common/AuthWrapperBlock/AuthWrapperBlock'
import usersApi from "../../../api/users"
import BaseButton from "../../common/Button/Button"

type renderTextInfoType = {
    hash: string
    verified: boolean
}

const renderTextInfo = ({hash, verified}: renderTextInfoType) => {
    if (hash) {
        if (verified) {
            return {status: "success", message: "Аккаунт успешно подтвержден!"};
        } else {
            return {status: "error", message: "Ошибка при подтверждении аккаунта!"};
        }
    } else {
        return {status: "success", message: "Ссылка с подтверждением аккаунта отправлена на E-Mail."};
    }
}
type PropsType = {
    location: any
    history: any
}

const CheckEmailInfo: React.FC<PropsType> = (props) => {

    const [verified, setVerified] = useState(false)
    const hash = props.location.search.split("hash=")[1]

    const [checking, setChecking] = useState(!!hash);
    const [info, setInfo] = useState(renderTextInfo({hash, verified}))

    const setStatus = ({checking, verified}: any) => {
        setInfo(renderTextInfo({hash, verified}))
        setVerified(verified)
        setChecking(checking)
    };

    useEffect(() => {
        if (hash) {
            usersApi
                .verifyHash(hash)
                .then(() => {
                    setStatus({verified: true, checking: false})
                })
                .catch(() => {
                    setStatus({verified: false, checking: false})
                })
        }
    }, [hash])

    return (
        <div className="verify-block">
            <Block>
                {!checking ?
                    <Result    // @ts-ignore
                        status={info.status}
                        title={info.status === "success" ? "Готово!" : "Ошибка"}
                        subTitle={info.message}
                        extra={
                            info.status === "success" &&
                            verified && (
                                <BaseButton type="primary"
                                            onClick={() => props.history.push("/sign-in")}>Войти
                                </BaseButton>
                            )}
                    /> :
                    <div className="verify-block__loading">
                        <Spin size="large"/>
                    </div>
                }
            </Block>
        </div>
    )
}

export default CheckEmailInfo