import datimApi from "@pepfar-react-lib/datim-api";
import {renderSearch} from "./lib/shared.testLib";

let searchUrl:string = `/sqlViews/VisNavgSrch/data?paging=false&var=uid:_,favoriteName:_,user:_,visualizationType:_,minViewCount:-1,maxViewCount:9223372036854776000,lastViewedMinDate:1969-01-01,lastViewedMaxDate:2100-01-01,limitViewsMinDate:1969-01-01,limitViewsMaxDate:2100-01-01,limit:100,includeNeverViewed:1`
let searchResponse = {
    "listGrid": {
        "rows": [
            [
                "n0CaxnRk0Pn",
                "test visualization",
                1,
                "2022-01-01",
                "chart",
                "",
                "enhanced"
            ]
        ]
    }
}

test(`8 > Non SuperUser share`, async ()=>{
    renderSearch();
    datimApi.registerGetMock(searchUrl,)
    search();
})

function search() {
    throw new Error("Function not implemented.");
}
