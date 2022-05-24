export function login(){
    cy.request({
        url: `${Cypress.env('baseUrl')}/dhis-web-commons-security/login.action`,
        method: 'POST',
        form: true,
        body:`j_username=${Cypress.env('username')}&j_password=${Cypress.env('password')}`
    })
    localStorage.setItem('DHIS2_BASE_URL', 'https://jakub.datim.org');
    cy.visit(`http://localhost:3000`)
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

export const getFilter = (n:number)=>cy.get(seln(`searchFilterItem`,n))
export const executeSearch = ()=>cy.get(sel('executeSearch')).click();

export function addTextFilter(n:number, type:string, value:string){
    cy.get(sel('addFilter')).click();
    getFilter(n).find(`[data-test="dhis2-uicore-select"]`).click();
    cy.get(`[data-value="${type}"]`).click();
    getFilter(n).find('input').type(value);
}