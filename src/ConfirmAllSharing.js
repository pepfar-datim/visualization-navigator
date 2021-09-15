import { useAlert, useDataEngine } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {
  Button,
  ButtonStrip,
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

const sharingQuery = {
  sharingInfo: {
    resource: "sharing",
    params: ({ id }) => ({
      type: "chart",
      id,
    }),
  },
};

const mutation = {
  resource: "sharing",
  params: ({ id }) => ({
    type: "chart",
    id: id,
  }),
  type: "update",
  data: ({ sharing }) => sharing,
};

const ConfirmAllSharing = ({ onClose, id, name, checkedItems }) => {
  const engine = useDataEngine();

  const { show: showError } = useAlert((errorMsg) => errorMsg, {
    duration: 2000,
    critical: true,
  });

  const { show: showSuccess } = useAlert((successMsg) => successMsg, {
    duration: 2000,
    success: true,
  });

  const updateAllSharing = async ({ engine, id, checkedItems }) => {
    const sharingResp = await engine.query(sharingQuery, { variables: { id } });
    try {
      await Promise.all(
        checkedItems.map((id) =>
          engine.mutate(mutation, {
            variables: {
              id,
              sharing: { object: sharingResp.sharingInfo.object },
            },
          })
        )
      );
      showSuccess(i18n.t("Sharing updated"));
    } catch (e) {
      showError(
        i18n.t("Sharing could not be updated: {{errorMsg}}", {
          errorMsg: e.message,
        })
      );
    }
  };

  return (
    <Modal position="middle" onClose={onClose}>
      <ModalTitle>
        {i18n.t("Apply updated sharing to all selected items?")}
      </ModalTitle>
      <ModalContent>
        <p>
          {i18n.t(
            `To apply the sharing settings that you updated for ${name} to all selected items, click confirm below.`
          )}
        </p>
        <p>
          {i18n.t(
            `If you do not wish to apply these updated sharing settings to other selected items, click cancel.`
          )}
        </p>
      </ModalContent>
      <ModalActions>
        <ButtonStrip end>
          <Button onClick={() => onClose()} secondary>
            {i18n.t("Cancel")}
          </Button>
          <Button
            onClick={() => {
              updateAllSharing({ engine, id, checkedItems });
              onClose();
            }}
            primary
          >
            {i18n.t("Confirm")}
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
};

ConfirmAllSharing.propTypes = {
  checkedItems: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
};

export default ConfirmAllSharing;
