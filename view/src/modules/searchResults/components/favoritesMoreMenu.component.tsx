import {useDataEngine} from "@dhis2/app-runtime";
import PropTypes from "prop-types";
import React from "react";
import i18n from "@dhis2/d2-i18n";
import {
    Button,
    Checkbox,
    IconInfo16,
    IconShare16,
    IconMore16,
    Menu,
    MenuItem,
    Popover,
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
} from "@dhis2/ui";

import CodeIcon from "../../../components/CodeIcon";

import {
    DASHBOARD,
    determineType,
    getOpenIcon,
    getOpenString,
    getFavLink,
    getAPIDestination,
} from "../../../components/visualizationTypes";

import "../styles/favoritesMoreMenu.css"

const determineSharing = (type) => {
    return type.toLowerCase();
};

export const FavoritesMoreMenu = ({
                               id,
                               name,
                               type,
                               allShareOption,
                               moreButtonRef,
                               toggleMoreMenu,
                               toggleSharingDialog,
                           }) => {
    const engine = useDataEngine();
    return (
        <>
            <div>
                <Popover
                    reference={moreButtonRef}
                    placement="bottom-start"
                    arrow={false}
                    onClickOutside={toggleMoreMenu}
                    style={{ backgroundColor: "#f3ffff" }}
                >
                    <div>
                        <Menu>
                            <MenuItem
                                icon={<IconInfo16 />}
                                dense
                                label={i18n.t("Show details")}
                                onClick={() => {
                                    toggleMoreMenu();

                                    window.open(`#/view/${id}`, "_blank");
                                }}
                            />
                            {type !== DASHBOARD && (
                                <>
                                    <MenuItem
                                        icon={<IconShare16 />}
                                        dense
                                        label={i18n.t("Update sharing (this item)")}
                                        onClick={() => {
                                            toggleMoreMenu();
                                            toggleSharingDialog({
                                                open: true,
                                                id,
                                                type: determineSharing(type),
                                                name,
                                                allItems: false,
                                            });
                                        }}
                                    />
                                    {allShareOption && (
                                        <MenuItem
                                            icon={<IconShare16 />}
                                            dense
                                            label={i18n.t("Update sharing (all selected items)")}
                                            onClick={() => {
                                                toggleMoreMenu();
                                                toggleSharingDialog({
                                                    open: true,
                                                    id,
                                                    type: determineSharing(type),
                                                    name,
                                                    allItems: true,
                                                });
                                            }}
                                        />
                                    )}
                                </>
                            )}

                            <MenuItem
                                icon={getOpenIcon(type)}
                                dense
                                label={i18n.t(getOpenString(type))}
                                onClick={() => {
                                    toggleMoreMenu();
                                    window.open(
                                        getFavLink(type, engine.link.baseUrl, id),
                                        "_blank"
                                    );
                                }}
                            />
                            <MenuItem
                                icon={<CodeIcon />}
                                dense
                                label={i18n.t("Open in api")}
                                onClick={() => {
                                    toggleMoreMenu();
                                    window.open(
                                        `${engine.link.baseUrl}/api/${getAPIDestination(
                                            type
                                        )}/${id}`,
                                        "_blank"
                                    );
                                }}
                            />
                        </Menu>
                    </div>
                </Popover>
            </div>
        </>
    );
};

FavoritesMoreMenu.propTypes = {
    allShareOption: PropTypes.bool,
    id: PropTypes.string,
    moreButtonRef: PropTypes.object,
    name: PropTypes.string,
    toggleMoreMenu: PropTypes.func,
    toggleSharingDialog: PropTypes.func,
    type: PropTypes.string,
};
