import PropTypes from "prop-types";
import React from "react";
import i18n from "@dhis2/d2-i18n";
import {Radio} from "@dhis2/ui"

export const RadioOptions = ({ viewCountRange, updateViewCountRange }) => (
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
        <style>{`
      .radioButton {
        margin-bottom: var(--spacers-dp16);
      }
    `}</style>
    </>
);

RadioOptions.propTypes = {
    updateViewCountRange: PropTypes.func,
    viewCountRange: PropTypes.object,
};