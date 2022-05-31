import {removeUserColumn} from "../services/removeUserColumn.service";
import {getServerResponse, withoutUsers, withUsers} from "./data/removeUserColumn.testData";

test(`Remove User Column`, () => {
    expect(removeUserColumn(getServerResponse('enhanced').listGrid)).toStrictEqual(withUsers.listGrid)
    expect(removeUserColumn(getServerResponse('default').listGrid)).toStrictEqual(withoutUsers.listGrid)
})