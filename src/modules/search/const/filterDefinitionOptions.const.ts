import i18n from "@dhis2/d2-i18n";

export const filterDefinitionOptions = {
    text: [{ label: i18n.t("contains"), value: "contains" }],
    textExpanded: [
        { label: i18n.t("contains"), value: "contains" },
        { label: i18n.t("is"), value: "eq" },
        { label: i18n.t("is not"), value: "neq" },
    ],
    enum: [{ label: i18n.t("is"), value: "eq" }],
    number: [
        { label: ">", value: "gt" },
        { label: ">=", value: "gte" },
        { label: "<", value: "lt" },
        { label: "<=", value: "lte" },
    ],
    date: [
        { label: i18n.t("after"), value: "gt" },
        { label: i18n.t("before"), value: "lt" },
        { label: i18n.t("never"), value: "nev" },
    ],
};