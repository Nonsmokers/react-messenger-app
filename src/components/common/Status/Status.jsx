import React from "react";
import classNames from "classnames";

import "./Status.scss";

const Status = (props) => (
    <span className={classNames("status", { "status--online": props.online })}>
    {props.online ? "онлайн" : "офлайн"}
  </span>
);


export default Status;