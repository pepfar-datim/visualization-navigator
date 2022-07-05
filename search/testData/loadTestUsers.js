// import {loadUsers} from "@pepfar-react-lib/dhis2-loader/jsbuild";
let loadUsers = require("@pepfar-react-lib/dhis2-loader").loadUsers;
let superUser = {
    id: 'testSuperUs',
    name: 'Test SuperUser',
    firstName: 'Test',
    surname:'SuperUser',
    userCredentials: {
        username: 'test-superUser',
        password: 'Password123',
    },
    authorities: ['ALL']
};
let superUser = {
    id: 'testSuperUs',
    name: 'Test SuperUser',
    firstName: 'Test',
    surname:'SuperUser',
    userCredentials: {
        username: 'test-superUser',
        password: 'Password123',
    },
    authorities: ['ALL']
}
loadUsers([superUser],'jakub.datim.org','Basic amZsYXNrYTpHcmVlbjE4IQ==')