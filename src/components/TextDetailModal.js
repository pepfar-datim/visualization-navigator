import i18n from "@dhis2/d2-i18n";
import {
  Button,
  ButtonStrip,
  Modal,
  ModalContent,
  ModalActions,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

const sanitizeText = ({ text }) => {
  return text.replaceAll("*", "").replaceAll("_", "");
};
const TextDetailModal = ({ setText, text }) => {
  const onClose = () => {
    setText(null);
  };

  return (
    <Modal position="middle" onClose={onClose}>
      <ModalContent>{sanitizeText({ text })}</ModalContent>
      <ModalActions>
        <ButtonStrip end>
          <Button
            onClick={() => {
              onClose();
            }}
            primary
          >
            {i18n.t("Close")}
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
};

TextDetailModal.propTypes = {
  setText: PropTypes.func,
  text: PropTypes.string,
};

export default TextDetailModal;
