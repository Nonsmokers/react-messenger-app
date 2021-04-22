import React, {useEffect, useState} from 'react';
import {Result, Spin} from 'antd';
import Block from '../../common/AuthWrapperBlock/AuthWrapperBlock';
import usersApi from "../../../api/users";
import Button from "../../common/Button/Button";

const renderTextInfo = (hash, verified) => {
    if (hash) {
        if (verified) {
            return {status: "success", message: "Аккаунт успешно подтвержден!"};
        } else {
            return {status: "error", message: "Ошибка при подтверждении аккаунта!"};
        }
    } else {
        return {status: "success", message: "Ссылка с подтверждением аккаунта отправлена на E-Mail."};
    }
};

//todo: исправить верификацию
const CheckEmailInfo = (props) => {

    const [verified, setVerified] = useState(false);
    const hash = props.location.search.split("hash=")[1];

    const [checking, setChecking] = useState(!!hash);
    const [info, setInfo] = useState(renderTextInfo({hash, checking, verified}));

    const setStatus = ({checking, verified}) => {
        setInfo(renderTextInfo({hash, checking, verified}));
        setVerified(verified);
        setChecking(checking);
    };

    useEffect(() => {
        if (hash) {
            usersApi
                .verifyHash(hash)
                .then(() => {
                    setStatus({verified: true, checking: false});
                })
                .catch(() => {
                    setStatus({verified: false, checking: false});
                });
        }
    }, []);

    console.log({info, checking, verified, hash});

    return (
        <div className="verify-block">
            <Block>
                {!checking ?
                    <Result
                        status={info.status}
                        title={info.status === "success" ? "Готово!" : "Ошибка"}
                        subTitle={info.message}
                        extra={
                            info.status === "success" &&
                            verified && (
                                <Button type="primary" onClick={() => props.history.push("/sign-in")}>Войти</Button>
                            )}
                    /> :
                    <div className="verify-block__loading">
                        <Spin size="large"/>
                    </div>
                }
            </Block>
        </div>
    );
};

export default CheckEmailInfo;