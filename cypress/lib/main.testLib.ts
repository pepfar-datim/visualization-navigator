export function login(){
    localStorage.setItem('DHIS2_BASE_URL', 'https://jakub.datim.org');
    cy.visit(`http://localhost:3000`)
    cy.get(`#j_username`).type(Cypress.env('username'))
    cy.get(`#j_password`).type(Cypress.env('password'))
    cy.get(sel('dhis2-adapter-loginsubmit')).click();
}

export function sel(testId){
    return `[data-test="${testId}"]`
}

export function seln(testId, n){
    return `${sel(testId)}:nth-of-type(${n})`;
}

export function texts(textsToFind:string[]){
    textsToFind.forEach((text)=>cy.contains(text))
}

export function textsIn(where:string, textsToFind:string[]){
    textsToFind.forEach((text)=>cy.get(where).contains(text));
}