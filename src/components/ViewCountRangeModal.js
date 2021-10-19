import i18n from "@dhis2/d2-i18n";
import {
  Button,
  ButtonStrip,
  InputField,
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
  Radio,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

const RadioOptions = ({ viewCountRange, updateViewCountRange }) => (
  <>
    <form>
      <div className="radioButton">
        <Radio
          dense
          checked={!viewCountRange.restrictRange}
          label={i18n.t("Include all views in view count statistic")}
          name="radio-allow-filtering-on-all"
          onChange={() => {
            updateViewCountRange({ restrictRange: false });
          }}
          value={"false"}
        />
      </div>
      <div className="radioButton">
        <Radio
          dense
          checked={viewCountRange.restrictRange}
          label={i18n.t("Limit view counts to a specified date range")}
          name="radio-restrict-filtering"
          onChange={() => {
            updateViewCountRange({ restrictRange: true });
          }}
          value={"true"}
        />
      </div>
    </form>
    <style jsx>{`
      .radioButton {
        margin-bottom: var(--spacers-dp16);
      }
    `}</style>
  </>
);

RadioOptions.propTypes = {
  updateViewCountRange: PropTypes.func,
  viewCountRange: PropTypes.obj,
};

const ViewCountRangeModal = ({
  viewCountRange,
  updateViewCountRange,
  setViewCountRangeModalOpen,
}) => {
  const onClose = () => {
    setViewCountRangeModalOpen(false);
  };

  return (
    <Modal position="middle" onClose={onClose}>
      <ModalTitle>{i18n.t("View count range")}</ModalTitle>
      <ModalContent>
        <RadioOptions
          viewCountRange={viewCountRange}
          updateViewCountRange={updateViewCountRange}
        />
        {viewCountRange.restrictRange && (
          <>
            <InputField
              type="date"
              label={i18n.t("Start date")}
              dense
              value={viewCountRange.startDate || ""}
              onChange={(e) => {
                updateViewCountRange({
                  startDate: e.value,
                });
              }}
            />
            <InputField
              type="date"
              label={i18n.t("End date")}
              dense
              value={viewCountRange.endDate || ""}
              onChange={(e) => {
                updateViewCountRange({
                  endDate: e.value,
                });
              }}
            />
          </>
        )}
      </ModalContent>
      <ModalActions>
        <ButtonStrip end>
          <Button
            onClick={() => {
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

ViewCountRangeModal.propTypes = {
  setViewCountRangeModalOpen: PropTypes.func,
  updateViewCountRange: PropTypes.func,
  viewCountRange: PropTypes.obj,
};

export default ViewCountRangeModal;
