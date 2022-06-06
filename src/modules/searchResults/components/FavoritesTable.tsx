import { useDataEngine } from "@dhis2/app-runtime";
import { useD2 } from "@dhis2/app-runtime-adapter-d2";
import i18n from "@dhis2/d2-i18n";
import SharingDialog from "@dhis2/d2-ui-sharing-dialog";
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
import PropTypes from "prop-types";
import React, { createRef, useState } from "react";
import { appConfig } from "../../../app.config.js";

import ConfirmAllSharing from "../../../components/ConfirmAllSharing";
import {
  DASHBOARD,
  determineType,
  getOpenIcon,
  getOpenString,
  getFavLink,
  getAPIDestination,
} from "../../../components/visualizationTypes";
import {removeUserColumn} from "../../../services/removeUserColumn.service";
import "../../../components/css/FavoritesTable.css"
import {FavoritesRow} from "./favoritesRow.component";

import "../styles/favoritesTable.css"


// defined here to load i18n translations
const headerNames = {
  name: i18n.t("Name"),
  "view count": i18n.t("Views"),
  date: i18n.t("Date"),
  type: i18n.t("Type"),
  user: i18n.t("Owner"),
  username: i18n.t("Username"),
};

const FavoritesTable = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [sharingAllModalOpen, setSharingAllModalOpen] = useState({
      id: "",
    open: false,
    name: "",
    type: "",
  });

  const { d2 } = useD2();
  const [sharingDialogOpen, toggleSharingDialog] = useState({
    open: false,
    id: "",
    type: "",
    name: "",
    allItems: false,
  });

  data = removeUserColumn(data);

  const updateIndividualChecked = (uid, type) => {
    if (!checkedItems.map((el) => el.uid).includes(uid)) {
      setCheckedItems([...checkedItems, { uid, type }]);
    } else {
      setCheckedItems(checkedItems.filter((i) => i.uid !== uid));
    }
  };

  const updateAllChecked = () => {
    if (allChecked) {
      setCheckedItems([]);
    } else {
      const allChecks = data.rows.map((d) => {
        return { uid: d[0], type: determineType(d[4]) };
      });
      setCheckedItems(allChecks.filter((c) => c.type !== DASHBOARD));
    }
    setAllChecked(!allChecked);
  };

  return (
    <>
      {!sharingDialogOpen.open && sharingAllModalOpen.open && (
        <ConfirmAllSharing
          id={sharingAllModalOpen.id}
          name={sharingAllModalOpen.name}
          type={sharingAllModalOpen.type}
          checkedItems={checkedItems}
          onClose={() =>
            setSharingAllModalOpen({ open: false, name: "", type: "",id:"" })
          }
        />
      )}
      <div className="tableContainer">
        <Table>
          <TableHead>
            <TableRowHead>
              <>
                <TableCellHead>
                  <Checkbox
                    checked={allChecked}
                    onChange={() => updateAllChecked()}
                  />
                </TableCellHead>
                {data.headers.slice(1).map((h) => (
                  <TableCellHead key={`header_${h.name}`}>
                    {headerNames[h.name.replace("_", " ")] || h.name}
                  </TableCellHead>
                ))}
                <TableCellHead></TableCellHead>
              </>
            </TableRowHead>
          </TableHead>
          <TableBody>
            {data.rows.map((dRow) => {
                return <FavoritesRow
                    key={`FavoritesRow_${dRow[appConfig.sqlQueryUIDIndex]}`}
                    headers={data.headers.slice(1)}
                    id={dRow[appConfig.sqlQueryUIDIndex]}
                    dataRow={dRow}
                    checked={checkedItems
                        .map((el) => el.uid)
                        .includes(dRow[appConfig.sqlQueryUIDIndex])}
                    multipleCheckedItems={checkedItems.length > 1}
                    updateIndividualChecked={updateIndividualChecked}
                    toggleSharingDialog={toggleSharingDialog}
                    sharingDialogOpen={sharingDialogOpen}
                    type={determineType(dRow[appConfig.sqlQueryTypeIndex])}
                />
            })}
          </TableBody>
        </Table>
        {sharingDialogOpen.open && (
          <SharingDialog
            d2={d2}
            id={sharingDialogOpen.id}
            type={sharingDialogOpen.type}
            open={sharingDialogOpen}
            onRequestClose={() => {
              if (sharingDialogOpen.allItems) {
                setSharingAllModalOpen({
                  open: true,
                  name: sharingDialogOpen.name,
                  type: sharingDialogOpen.type,
                  id: sharingDialogOpen.id,
                });
              }
              toggleSharingDialog({
                open: false,
                id: "",
                type: "",
                name: "",
                allItems: false,
              });
            }}
            insertTheme={true}
          />
        )}
      </div>
    </>
  );
};

FavoritesTable.propTypes = {
  data: PropTypes.object,
};

export default FavoritesTable;
