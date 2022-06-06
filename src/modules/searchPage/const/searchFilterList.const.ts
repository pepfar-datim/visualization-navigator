import i18n from "@dhis2/d2-i18n";

export const searchFilterList = [
    { prop: "name", displayName: i18n.t("name"), type: "text", count: 1 },
    {
        prop: "view_count",
        displayName: i18n.t("view count"),
        type: "number",
        count: 2,
    },
    {
        prop: "last_viewed",
        displayName: i18n.t("last viewed"),
        type: "date",
        count: 2,
    },
    {
        prop: "type",
        displayName: i18n.t("type"),
        type: "enum",
        count: 1,
        allowedValues: [
            { label: i18n.t("chart"), value: "chart" },
            { label: i18n.t("dashboard"), value: "dashboard" },
            { label: i18n.t("map"), value: "map" },
            { label: i18n.t("pivot"), value: "pivot" },
        ],
    },
];

const userFilter = {
    prop: "user",
    displayName: i18n.t("owner"),
    type: "text",
    count: 1,
}

export function getAllFilters(usersTablePresent:boolean){
    return searchFilterList.concat(usersTablePresent?[userFilter]:[]);
}