import React from "react";
import classNames from "classnames";

import "./Status.scss";

const Status = ({online, fullname}) => (
    <div className="chat__dialog-header-center">
        <b className="chat__dialog-header-username">{fullname}</b>
        <div className="chat__dialog-header-status">
            <span className={classNames("status", {"status--online": online})}>
                 {online ? "онлайн" : "офлайн"}
        </span>
        </div>
    </div>
);


export default Status;