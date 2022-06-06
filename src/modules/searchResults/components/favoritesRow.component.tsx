import React, {createRef, useState} from "react";
import {FavoritesMoreMenu} from "./favoritesMoreMenu.component";
import {appConfig} from "../../../app.config";
import PropTypes from "prop-types";
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

import {
    DASHBOARD,
    determineType,
    getOpenIcon,
    getOpenString,
    getFavLink,
    getAPIDestination,
} from "../../../components/visualizationTypes";


export const FavoritesRow = ({
                          id,
                          dataRow,
                          headers,
                          checked,
                          multipleCheckedItems,
                          updateIndividualChecked,
                          toggleSharingDialog,
                          sharingDialogOpen,
                          type,
                      }) => {
    const [moreMenuOpen, setMoreMenuOpen] = useState(false);

    const toggleMoreMenu = () => {
        setMoreMenuOpen(!moreMenuOpen);
    };

    const moreButtonRef = createRef();

    return (
        <TableRow>
            <>
                <TableCell key={`check_${id}`}>
                    {type !== DASHBOARD && (
                        <Checkbox
                            checked={checked}
                            onChange={() => updateIndividualChecked(id, type)}
                        />
                    )}
                </TableCell>
                {dataRow.slice(1).map((val, ind) => (
                    <TableCell key={`cell_${id}_${headers[ind].name}`}>
                        {i18n.t(val)}
                    </TableCell>
                ))}
                <TableCell key={`more_buttons_${id}`}>
                    <div ref={moreButtonRef}>
                        <Button
                            icon={<IconMore16 />}
                            small
                            onClick={() => toggleMoreMenu()}
                        />
                    </div>
                    {moreMenuOpen && !sharingDialogOpen.open && (
                        <FavoritesMoreMenu
                            id={id}
                            name={dataRow[appConfig.sqlQueryNameIndex]}
                            type={type}
                            allShareOption={checked && multipleCheckedItems}
                            moreButtonRef={moreButtonRef}
                            toggleMoreMenu={toggleMoreMenu}
                            toggleSharingDialog={toggleSharingDialog}
                        />
                    )}
                </TableCell>
            </>
        </TableRow>
    );
};

FavoritesRow.propTypes = {
    checked: PropTypes.bool,
    dataRow: PropTypes.array,
    headers: PropTypes.array,
    id: PropTypes.string,
    multipleCheckedItems: PropTypes.bool,
    sharingDialogOpen: PropTypes.object,
    toggleSharingDialog: PropTypes.func,
    type: PropTypes.string,
    updateIndividualChecked: PropTypes.func,
};
