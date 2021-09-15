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
  IconVisualizationArea16,
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
import ConfirmAllSharing from "./ConfirmAllSharing";

const FavoritesMoreMenu = ({
  id,
  name,
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
              {allShareOption ? (
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
                        name,
                        allItems: false,
                      });
                    }}
                  />
                  <MenuItem
                    icon={<IconShare16 />}
                    dense
                    label={i18n.t("Update sharing (all selected items)")}
                    onClick={() => {
                      toggleMoreMenu();
                      toggleSharingDialog({
                        open: true,
                        id,
                        name,
                        allItems: true,
                      });
                    }}
                  />
                </>
              ) : (
                <MenuItem
                  icon={<IconShare16 />}
                  dense
                  label={i18n.t("Update sharing")}
                  onClick={() => {
                    toggleMoreMenu();
                    toggleSharingDialog({
                      open: true,
                      id,
                      name,
                      allItems: false,
                    });
                  }}
                />
              )}

              <MenuItem
                icon={<IconVisualizationArea16 />}
                dense
                label={i18n.t("Open in visualizer")}
                onClick={() => {
                  toggleMoreMenu();
                  window.open(
                    `${engine.link.baseUrl}/dhis-web-data-visualizer/index.html#/${id}`,
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
          <Checkbox
            checked={checked}
            onChange={() => updateIndividualChecked(id)}
          />
        </TableCell>
        {dataRow.slice(1).map((val, ind) => (
          <TableCell key={`cell_${id}_${headers[ind].name}`}>{val}</TableCell>
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

const FavoritesTable = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [sharingAllModalOpen, setSharingAllModalOpen] = useState({
    open: false,
    name: "cat",
  });

  const { d2 } = useD2();
  const [sharingDialogOpen, toggleSharingDialog] = useState({
    open: false,
    id: "",
    name: "",
    allItems: false,
  });

  const updateIndividualChecked = (uid) => {
    if (checkedItems.indexOf(uid) === -1) {
      setCheckedItems([...checkedItems, uid]);
    } else {
      setCheckedItems(checkedItems.filter((i) => i !== uid));
    }
  };

  const updateAllChecked = () => {
    if (allChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(data.rows.map((d) => d[0]));
    }
    setAllChecked(!allChecked);
  };

  return (
    <>
      {!sharingDialogOpen.open && sharingAllModalOpen.open && (
        <ConfirmAllSharing
          id={sharingAllModalOpen.id}
          name={sharingAllModalOpen.name}
          checkedItems={checkedItems}
          onClose={() => setSharingAllModalOpen({ open: false, name: "" })}
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
                    {i18n.t(h.name)}
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
                checked={checkedItems.indexOf(dRow[0]) > -1}
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
            type="visualization"
            open={sharingDialogOpen}
            onRequestClose={() => {
              if (sharingDialogOpen.allItems) {
                setSharingAllModalOpen({
                  open: true,
                  name: sharingDialogOpen.name,
                  id: sharingDialogOpen.id,
                });
              }
              toggleSharingDialog({
                open: false,
                id: "",
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
            margin: var(--spacers-dp24) var(--spacers-dp16) var(--spacers-dp24)
              var(--spacers-dp16);
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
