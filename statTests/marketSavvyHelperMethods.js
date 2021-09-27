exports.checkClearedData = checkClearedData
exports.addMarketInfoEventsAndCheckCells = addMarketInfoEventsAndCheckCells
exports.delete9thCellAndCheck9thCell = delete9thCellAndCheck9thCell
exports.goThroughCellsAndCheckStatus = goThroughCellsAndCheckStatus
const helperMethods = require('./helperMethods.js')

function goThroughCellsAndCheckStatus(numberOfCells, cellStatus) {
  cy.get('app-career').within(() => {
    cy.get('app-savvy-stats-card').within(() => {
      for(let i = 1; i < numberOfCells; i++) {
        cy.get('div').filter(`:contains("${i}")`)
          .should('have.class', cellStatus)
      }
    })
  })
}

function delete9thCellAndCheck9thCell() {
  helperMethods.accessStatsTab()
  cy.get('[data-testid="entries-button"]')
    .click()
    .wait(1000)
  cy.get('ion-label').filter(':contains("Market Info")')
    .click()
    .wait(1000)
  cy.get('#ellipsisMenu')
    .click()
    .wait(1000)
  cy.get('button').filter(':contains("Delete")')
    .click()
    .wait(1000)
  cy.get('button').filter(':contains("Yes")')
    .click()
    .wait(1000)
  cy.get('#backbutton')
    .click()
    .wait(1000)
  helperMethods.accessStatsTab()
  cy.get('app-career').within(() => {
    cy.get('app-savvy-stats-card').within(() => {
      cy.get('div').filter(':contains("9")')
        .should('have.class', 'savvy-incomplete')
    })
  })
}

function addMarketInfoEventsAndCheckCells() {
  for(let i = 1; i < 10; i++) {
    cy.get('#pinkPlusButton')
      .click()
      .wait(500)
    cy.get('button').filter(':contains("Market Info")')
      .click()
      .wait(500)
    cy.get('[id="Name Market Info"]').within(() => {
      cy.get('input')
        .click()
        .type('Test')
    })
    cy.get('[id="Source Name"]').within(() => {
      cy.get('input')
        .click()
        .type('Test')
    })
    cy.get('ion-chip').filter(':contains("Base Pay")')
      .click()
    cy.get('[id="MarketInfo.keyInfo"]').within(() => {
      cy.get('textarea')
        .click()
        .type('Test')
    })
    cy.get('#saveButton')
      .click()
      .wait(500)
    helperMethods.accessStatsTab()
    for(let j = 1; j <= i; j++) {
      cy.get('app-career').within(() => {
        cy.get('app-savvy-stats-card').within(() => {
          cy.get('div').filter(`:contains("${i}")`)
            .should('have.class', 'savvy-complete')
        })
      })
    }
  }
}

function checkClearedData() {
  cy.get('app-career').within(() => {
    cy.get('app-savvy-stats-card').within(() => {
      for(let i = 1; i < 10; i++) {
        cy.get('div').filter(`:contains("${i}")`)
          .should('have.class', 'savvy-incomplete')
      }
    })
  })
}