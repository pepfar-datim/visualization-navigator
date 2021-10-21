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
import { Link } from "react-router-dom";
import CodeIcon from "./CodeIcon";
import ConfirmAllSharing from "./ConfirmAllSharing";
import {
  MAP,
  DASHBOARD,
  determineType,
  getOpenIcon,
  getOpenString,
  getFavLink,
} from "./visualizationTypes";

// update this logic
const determineSharing = (type) => {
  return type.toLowerCase();
};

const getAPIDestination = (type) => {
  switch (type) {
    case MAP:
      return "maps";
    case DASHBOARD:
      return "dashboards";
    default:
      return "visualizations";
  }
};

const FavoritesMoreMenu = ({
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
              <Link to={`/view/${id}`} target="_blank">
                <MenuItem
                  icon={<IconInfo16 />}
                  dense
                  label={i18n.t("Show details")}
                />
              </Link>
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
      <style jsx>
        {`
          .menuContainer {
            color: red;
            background-color: green;
          }
        `}
      </style>
    </>
  );
};

FavoritesMoreMenu.propTypes = {
  allShareOption: PropTypes.bool,
  id: PropTypes.string,
  moreButtonRef: PropTypes.obj,
  name: PropTypes.string,
  toggleMoreMenu: PropTypes.func,
  toggleSharingDialog: PropTypes.func,
  type: PropTypes.string,
};

const FavoritesRow = ({
  id,
  dataRow,
  headers,
  checked,
  multipleCheckedItems,
  updateIndividualChecked,
  toggleSharingDialog,
  sharingDialogOpen,
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
          {dataRow[4] !== DASHBOARD && (
            <Checkbox
              checked={checked}
              onChange={() => updateIndividualChecked(id, dataRow[4])}
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
              name={dataRow[1]}
              type={determineType(dataRow[4])}
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
  updateIndividualChecked: PropTypes.func,
};

// defined here to load i18n translations
const headerNames = {
  name: i18n.t("name"),
  "view count": i18n.t("view count"),
  date: i18n.t("date"),
  type: i18n.t("type"),
  user: i18n.t("user"),
};

const FavoritesTable = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [sharingAllModalOpen, setSharingAllModalOpen] = useState({
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
            setSharingAllModalOpen({ open: false, name: "", type: "" })
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
            {data.rows.map((dRow) => (
              <FavoritesRow
                key={`FavoritesRow_${dRow[0]}`}
                headers={data.headers.slice(1)}
                id={dRow[0]}
                dataRow={dRow}
                checked={checkedItems.map((el) => el.uid).includes(dRow[0])}
                multipleCheckedItems={checkedItems.length > 1}
                updateIndividualChecked={updateIndividualChecked}
                toggleSharingDialog={toggleSharingDialog}
                sharingDialogOpen={sharingDialogOpen}
              />
            ))}
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
      <style jsx>
        {`
          .tableContainer {
            margin: var(--spacers-dp24) 0 var(--spacers-dp24) 0;
          }
        `}
      </style>
    </>
  );
};

FavoritesTable.propTypes = {
  data: PropTypes.object,
};

export default FavoritesTable;
