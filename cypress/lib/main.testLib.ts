export function login(){
    localStorage.setItem('DHIS2_BASE_URL', 'https://jakub.datim.org');
    cy.visit(`http://localhost:3000`)
    cy.get(`#j_username`).type(Cypress.config.env.username)
}

export function sel(testId){
    return `[data-test="${testId}"]`
}

export function texts(textsToFind:string[]){
    textsToFind.forEach((text)=>cy.contains(text))
}

export function textsIn(where:string, textsToFind:string[]){
    textsToFind.forEach((text)=>cy.get(where).contains(text));
}