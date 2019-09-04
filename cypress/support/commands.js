/* global Cypress cy */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('clearState', (...states) => {
  cy.window().then(async window => {
    const dbs = await window.indexedDB.databases()
    dbs.forEach(db => { window.indexedDB.deleteDatabase(db.name) })
  })
})

Cypress.Commands.add('testid', testid => cy.get(`[data-testid="${testid}"]`))

Cypress.Commands.add('drag', { prevSubject: 'element' }, (subject, targetEl, event = 'drop') => {
  cy.wrap(subject).trigger('dragstart')
  cy.get(targetEl).trigger(event)
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
