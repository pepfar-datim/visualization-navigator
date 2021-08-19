import { useDataEngine } from "@dhis2/app-runtime";
import { useD2 } from "@dhis2/app-runtime-adapter-d2";
import i18n from "@dhis2/d2-i18n";
import SharingDialog from "@dhis2/d2-ui-sharing-dialog";
import {
  Button,
  Checkbox,
  IconCross16,
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
import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";

const FavoritesMoreMenu = ({
  id,
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
              <MenuItem
                icon={<IconShare16 />}
                dense
                label={i18n.t("Update sharing")}
                onClick={() => {
                  toggleMoreMenu();
                  toggleSharingDialog({ open: true, id });
                }}
              />
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

const FavoritesRow = ({
  id,
  dataRow,
  checked,
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
        <TableCell>
          <Checkbox
            checked={checked}
            onChange={() => updateIndividualChecked(id)}
          />
        </TableCell>
        {dataRow.slice(1).map((val) => (
          <TableCell>{val}</TableCell>
        ))}
        <TableCell>
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

const FavoritesTable = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const { d2 } = useD2();
  const [sharingDialogOpen, toggleSharingDialog] = useState({
    open: false,
    id: "",
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
                  <TableCellHead>{i18n.t(h.name)}</TableCellHead>
                ))}
                <TableCellHead></TableCellHead>
              </>
            </TableRowHead>
          </TableHead>
          <TableBody>
            {data.rows.map((dRow) => (
              <FavoritesRow
                id={dRow[0]}
                dataRow={dRow}
                checked={checkedItems.indexOf(dRow[0]) > -1}
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
              toggleSharingDialog({ open: false, id: "" });
            }}
            insertTheme={true}
          />
        )}
      </div>
      <style jsx>
        {`
          .tableContainer {
            width: 95%;
            margin: 32px auto 32px 8px;
          }
        `}
      </style>
    </>
  );
};

export default FavoritesTable;
