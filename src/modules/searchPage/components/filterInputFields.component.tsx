import PropTypes from "prop-types";
import React from "react";
import {
    InputField,
    SingleSelectField,
    SingleSelectOption,
} from "@dhis2/ui";

export const FilterInputFields = ({ filterInfo, updateFilter, filterMap }) => {
    switch (filterMap[filterInfo.prop].type) {
        case "date":
            if (filterInfo.filterDefinitionOption === "nev") {
                return <></>;
            }
            return (
                <InputField
                    type="date"
                    dense
                    value={filterInfo.text}
                    onChange={(e) => {
                        updateFilter({
                            uid: filterInfo.id,
                            object: { ...filterInfo, text: e.value },
                        });
                    }}
                />
            );
        case "enum":
            return (
                <SingleSelectField
                    selected={filterInfo.text}
                    onChange={({ selected }) => {
                        updateFilter({
                            uid: filterInfo.id,
                            object: { ...filterInfo, text: selected },
                        });
                    }}
                >
                    {filterMap[filterInfo.prop].allowedValues.map((av) => (
                        <SingleSelectOption
                            key={`filtValue_${filterInfo.id}_${av.value}`}
                            value={av.value}
                            label={av.label}
                        />
                    ))}
                </SingleSelectField>
            );
        default:
            return (
                <InputField
                    value={filterInfo.text}
                    onChange={(e) => {
                        updateFilter({
                            uid: filterInfo.id,
                            object: { ...filterInfo, text: e.value },
                        });
                    }}
                />
            );
    }
};

FilterInputFields.propTypes = {
    filterInfo: PropTypes.object,
    filterMap: PropTypes.object,
    updateFilter: PropTypes.func,
};