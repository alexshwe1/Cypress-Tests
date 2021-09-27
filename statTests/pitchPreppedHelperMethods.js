exports.addPitch = addPitch
exports.checkPitchPreppedGrid = checkPitchPreppedGrid
exports.deletePitch = deletePitch
exports.checkClearedData = checkClearedData

function checkClearedData() {
  cy.get('app-career').within(() => {
    cy.get('app-pitch-prepped-stats-card').within(() => {
      cy.get('div').filter(':contains("Elevator")')
        .should('have.class', 'pitch-incomplete')
      cy.get('div').filter(':contains("Networking")')
        .should('have.class', 'pitch-incomplete')
      cy.get('div').filter(':contains("Goal")')
        .should('have.class', 'pitch-incomplete')
      cy.get('div').filter(':contains("Social")')
        .should('have.class', 'pitch-incomplete')
    })
  })
}

function deletePitch(whichPitchType) {
  cy.get('[data-testid="entries-button"]')
    .click()
    .wait(500)
  cy.get('ion-label').filter(':contains("Pitches")')
    .click()
    .wait(500)

  cy.get('[id="entryCard"]').filter(`:contains("${whichPitchType}")`).within(() => {
    cy.get('#ellipsisMenu')
      .click()
      .wait(1000)
  })
  cy.get('button').filter(':contains("Delete")')
    .click()
    .wait(500)
  cy.get('button').filter(':contains("Yes")')
    .click()
    .wait(500)
  cy.get('#backbutton')
    .click()
    .wait(500)
}

function addPitch(whichPitchType) {
  cy.get('#pinkPlusButton')
    .click()
    .wait(500)
  cy.get('button').filter(':contains("Efforts")')
    .click()
    .wait(500)
  cy.get('button').filter(':contains("Pitch")')
    .click()
    .wait(500)
  cy.get('button').filter(':contains("New Pitch")')
    .click()
    .wait(500)
  cy.get('[id="Name Pitch"]').within(() => {
    cy.get('input')
      .click()
      .type(whichPitchType)
  })
  cy.get('ion-label').filter(`:contains(${whichPitchType})`)
    .click()
    .wait(1000)
  cy.get('#saveButton')
    .click()
    .wait(1000)
  cy.get('.cancel-button')
    .click()
    .wait(1000)
}

function checkPitchPreppedGrid(isElevatorComplete, isNetworkingComplete, isGoalComplete, isSocialComplete) {
  cy.get('app-career').within(() => {
    cy.get('app-pitch-prepped-stats-card').within(() => {
      if(isElevatorComplete) {
        cy.get('div').filter(':contains("Elevator")')
          .should('have.class', 'pitch-complete')
      } else {
        cy.get('div').filter(':contains("Elevator")')
          .should('have.class', 'pitch-incomplete')
      }
      if(isNetworkingComplete) {
        cy.get('div').filter(':contains("Networking")')
          .should('have.class', 'pitch-complete')
      } else {
        cy.get('div').filter(':contains("Networking")')
          .should('have.class', 'pitch-incomplete')
      }
      if(isGoalComplete) {
        cy.get('div').filter(':contains("Goal")')
          .should('have.class', 'pitch-complete')
      } else {
        cy.get('div').filter(':contains("Goal")')
          .should('have.class', 'pitch-incomplete')
      }
      if(isSocialComplete) {
        cy.get('div').filter(':contains("Social")')
          .should('have.class', 'pitch-complete')
      } else {
        cy.get('div').filter(':contains("Social")')
          .should('have.class', 'pitch-incomplete')
      }
    })
  })
}