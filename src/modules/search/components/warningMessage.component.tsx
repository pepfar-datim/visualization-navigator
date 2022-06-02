import React from "react";
import {
    IconInfo24,
    IconWarning24,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import "../styles/warningMessage.style.css"

export const WarningMessage = ({ messageText, infoMessage }:{infoMessage:boolean, messageText:string}) => (
    <div className={infoMessage ? "infoMessage" : "warningMessage"}>
        {infoMessage && <IconInfo24 />}
        {!infoMessage && <IconWarning24 />}
        <span>{messageText}</span>
    </div>
);

WarningMessage.propTypes = {
    infoMessage: PropTypes.bool,
    messageText: PropTypes.string,
};