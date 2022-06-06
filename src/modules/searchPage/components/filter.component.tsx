import {FilterInputFields} from "./filterInputFields.component";
import PropTypes from "prop-types";
import React from "react";
import i18n from "@dhis2/d2-i18n";
import {
    Button,
    SingleSelectField,
    SingleSelectOption,
    IconCross16
} from "@dhis2/ui";
import "../styles/filter.style.css"

export const Filter = ({
        filterInfo,
        filterMap,
        availableFilters,
        deleteFilter,
        updateFilter,
    }) => {
    return (
        <>
            <div className="filterButtons" data-test={`searchFilterItem`}>
                <div className="selectWrapper">
                    <SingleSelectField
                        // defaultValue={"name"}
                        // label={i18n.t("Filter")}
                        selected={filterInfo.prop || ""}
                        onChange={(e) => {
                            updateFilter({
                                uid: filterInfo.id,
                                object: {
                                    ...filterInfo,
                                    text: "",
                                    prop: e.selected,
                                    filterDefinitionOption:
                                    filterMap[e.selected].options[0].value,
                                },
                            });
                        }}
                    >
                        {availableFilters.map((f) => (
                            <SingleSelectOption
                                key={`filtProp_${filterInfo.id}_${f.prop}`}
                                label={f.displayName}
                                value={f.prop}
                            />
                        ))}
                    </SingleSelectField>
                </div>
                {filterInfo.prop && (
                    <>
                        <SingleSelectField
                            selected={filterInfo.filterDefinitionOption || ""}
                            disabled={filterMap[filterInfo.prop].options.length === 1}
                            onChange={({ selected }) => {
                                updateFilter({
                                    uid: filterInfo.id,
                                    object: { ...filterInfo, filterDefinitionOption: selected },
                                });
                            }}
                        >
                            {filterMap[filterInfo.prop].options.map((opt) => (
                                <SingleSelectOption
                                    key={`${filterInfo.prop}_${opt.value}`}
                                    value={opt.value}
                                    label={opt.label}
                                />
                            ))}
                        </SingleSelectField>
                        <FilterInputFields
                            filterInfo={filterInfo}
                            updateFilter={updateFilter}
                            filterMap={filterMap}
                        />
                    </>
                )}

                <div>
                    <Button
                        icon={<IconCross16 />}
                        onClick={() => deleteFilter(filterInfo.id)}
                    />
                </div>
            </div>
        </>
    );
};

Filter.propTypes = {
    availableFilters: PropTypes.array,
    deleteFilter: PropTypes.func,
    filterInfo: PropTypes.object,
    filterMap: PropTypes.object,
    updateFilter: PropTypes.func,
};