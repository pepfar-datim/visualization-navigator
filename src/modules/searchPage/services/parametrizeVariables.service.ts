export const parameterizeVariables = ({ filters, viewCountRange, countLimit }) => {
    // rethink approach this to make more generalizable
    const variables = {
        uid: "_",
        favoriteName: "_",
        minViewCount: -1,
        maxViewCount: 9223372036854775807,
        user: "_",
        lastViewedMinDate: "1969-01-01",
        lastViewedMaxDate: "2100-01-01",
        includeNeverViewed: 1,
        visualizationType: "_",
        limitViewsMinDate: "1969-01-01",
        limitViewsMaxDate: "2100-01-01",
        limit: 100,
    };

    const variableNameMap = {
        name: {
            contains: "favoriteName",
        },
        view_count: {
            gt: "minViewCount",
            gte: "minViewCount",
            lt: "maxViewCount",
            lte: "maxViewCount",
            nev: "isNever",
        },
        user: {
            contains: "user",
        },
        last_viewed: {
            gt: "lastViewedMinDate",
            lt: "lastViewedMaxDate",
        },
        type: {
            eq: "visualizationType",
        },
    };

    variables.limit = countLimit;
    if (countLimit !== "ALL") {
        variables.limit = parseInt(countLimit);
    }

    const neverPresent =
        filters.filter((f) => {
            return f.prop === "last_viewed" && f.filterDefinitionOption === "nev";
        }).length > 0;
    const datePresent =
        filters.filter((f) => {
            return (
                f.prop === "last_viewed" &&
                ["gt", "lt"].includes(f.filterDefinitionOption)
            );
        }).length > 0;
    filters.forEach((filt) => {
        if (
            variableNameMap[filt.prop] &&
            variableNameMap[filt.prop][filt.filterDefinitionOption]
        ) {
            // move this logic to variableNameMap
            let variableVal = filt.text;
            if (filt.filterDefinitionOption === "gte") {
                variableVal = parseInt(variableVal) - 1;
            }
            if (filt.filterDefinitionOption === "lte") {
                variableVal = parseInt(variableVal) + 1;
            }

            variables[variableNameMap[filt.prop][filt.filterDefinitionOption]] =
                variableVal;
        }
    });

    // handle never logic
    if (datePresent) {
        variables.includeNeverViewed = 0;
    }
    if (neverPresent && !datePresent) {
        variables.lastViewedMaxDate = "1969-01-01";
    }

    // handle view count range restrictions
    if (viewCountRange.restrictRange) {
        if (viewCountRange.startDate) {
            variables.limitViewsMinDate = viewCountRange.startDate;
        }
        if (viewCountRange.endDate) {
            variables.limitViewsMaxDate = viewCountRange.endDate;
        }
    }

    return Object.keys(variables).reduce((allVars, currVar) => {
        return [...allVars, `${currVar}:${variables[currVar]}`];
    }, []);
};