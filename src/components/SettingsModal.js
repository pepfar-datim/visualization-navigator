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
  SingleSelectField,
  SingleSelectOption,
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

const SettingsModal = ({
  viewCountRange,
  updateViewCountRange,
  setSettingsModalOpen,
  countLimit,
  setCountLimit,
}) => {
  const onClose = () => {
    setSettingsModalOpen(false);
  };

  const limitOptions = [100, 500, 1000, "ALL"];

  return (
    <>
      <Modal position="middle" onClose={onClose}>
        <ModalTitle>{i18n.t("Settings")}</ModalTitle>
        <ModalContent>
          <div className="settingItem">
            <div className="subtitle">
              <span>{i18n.t("Search result limit")}</span>
            </div>
            <div className="limitSelect">
              <SingleSelectField
                onChange={({ selected }) => {
                  setCountLimit(selected);
                }}
                selected={countLimit}
              >
                {limitOptions.map((opt) => (
                  <SingleSelectOption
                    key={`limit_option_${opt}`}
                    value={opt.toString()}
                    label={opt === "ALL" ? i18n.t("ALL") : opt.toString()}
                  />
                ))}
              </SingleSelectField>
            </div>
          </div>
          <div className="settingItem">
            <div className="subtitle">
              <span>{i18n.t("View count range")}</span>
            </div>
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
          </div>
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
      <style jsx>{`
        .limitSelect {
          width: 250px;
        }
        .settingItem {
          margin-bottom: var(--spacers-dp32);
        }
        .subtitle {
          height: 30px;
          margin-bottom: var(--spacers-dp4);
        }
        .subtitle span {
          font-size: 1.1em;
        }
      `}</style>
    </>
  );
};

SettingsModal.propTypes = {
  countLimit: PropTypes.string,
  setCountLimit: PropTypes.string,
  setSettingsModalOpen: PropTypes.func,
  updateViewCountRange: PropTypes.func,
  viewCountRange: PropTypes.obj,
};

export default SettingsModal;