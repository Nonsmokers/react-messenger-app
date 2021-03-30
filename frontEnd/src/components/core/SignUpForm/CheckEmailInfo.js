import React, {useEffect, useState} from 'react';
import {Result} from 'antd';
import Block from '../../common/AuthWrapperBlock/AuthWrapperBlock';
import users from "../../../api/users";
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

const CheckEmailInfo = (props) => {

    const [verified, setVerified] = useState(false);
    const hash = props.location.search.split("hash=")[1];
    const info = renderTextInfo(hash, verified);

    useEffect(() => {
        if (hash) {
            const data =  users.verifyHash(hash)
            if (data.status === "success") {
                setVerified(true);
            }
        }
    }, [hash])

    return (
        <div className="verify-block">
            <Block>
                <Result
                    status={info.status}
                    title={info.status === "success" ? "Готово!" : "Ошибка"}
                    subTitle={info.message}
                    extra={
                        info.status === "success" &&
                        verified && (
                            <Button type="primary" onClick={() => props.history.push("/sign-in")}>Войти</Button>
                        )
                    }
                />
            </Block>
        </div>
    );
};

export default CheckEmailInfo;