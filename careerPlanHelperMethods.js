exports.clearUserData = clearUserData
exports.accessCareerPlanFromHomePage = accessCareerPlanFromHomePage
exports.accessShortTermFromCareerPlanPage = accessShortTermFromCareerPlanPage
exports.accessLongTermFromCareerPlanPage = accessLongTermFromCareerPlanPage
exports.addGoal = addGoal
exports.addMotOrObj = addMotOrObj
exports.ensureOnlyGoalPlusSignIsVisible = ensureOnlyGoalPlusSignIsVisible
exports.ensureEverythingFilled = ensureEverythingFilled

function ensureEverythingFilled() {
  cy.get('[id="goalCard"]').within(() => {
    cy.get('ion-card-content').should('have.text', 'ST Goal 1')
  })
  cy.get('[id="motivationCard"]').within(() => {
    cy.get('ion-card-content').should('have.text', 'ST Mot 1')
  })
  cy.get('[id="objectiveCard"]').within(() => {
    cy.get('ion-card-content').should('have.text', 'ST Obj 1')
  })
}

function ensureOnlyGoalPlusSignIsVisible() {
  cy.get('[id="goalCard"]').within(() => {
    cy.get('[name="add-circle-outline"]').should('be.visible')
  })
  cy.get('[id="motivationCard"]').within(() => {
    cy.get('[name="add-circle-outline"]').should('not.exist')
  })
  cy.get('[id="objectiveCard"]').within(() => {
    cy.get('[name="add-circle-outline"]').should('not.exist')
  })
}

function addMotOrObj(isMotivation, name) {
  if(isMotivation) {
    cy.get('[id="motivationCard"]').within(() => {
      cy.get('[name="add-circle-outline"]')
        .click()
        .wait(500)
    })
    cy.get('[id="Motivation.goal"]').within(() => {
      cy.get('[role="combobox"]')
        .should('have.text', 'ST Goal 1')
    })
    cy.get('[id="Name Motivation"]').within(() => {
      cy.get('input')
        .click()
          .type(`${name}`)
    })
  } else {
    cy.get('[id="objectiveCard"]').within(() => {
      cy.get('[name="add-circle-outline"]')
        .click()
        .wait(500)
    })
    cy.get('[id="Objective.goal"]').within(() => {
      cy.get('[role="combobox"]')
        .should('have.text', 'ST Goal 1')
    })
    cy.get('[id="Name Objective"]').within(() => {
      cy.get('input')
        .click()
          .type(`${name}`)
    })
    cy.get('[id="Objective.rank"]').within(() => {
      cy.get('ion-segment-button').filter(':contains("Low")')
        .click()
    })
    cy.get('[id="Objective.achieveByDate"]').within(()=> {
      cy.get('input')
        .click()
        .type('12/31/2021{enter}')
    })
  }
  cy.get('[id="saveButton"]')
    .click()
    .wait(500)
}

function addGoal(shortTermOrLongTerm, goalName) {
  cy.get('[id="goalCard"]').within(() => {
    cy.get('[name="add-circle-outline"]')
      .click()
      .wait(500)
  })
  cy.get('[id="Goal.type"]').within(() => {
    cy.get('ion-segment-button').filter(`:contains(${shortTermOrLongTerm})`)
      .should('have.attr', 'aria-selected', 'true')
  })
  cy.get('[id="Name Goal"]').within(() => {
    cy.get('input')
      .click()
        .type(`${goalName}`)
  })
  cy.get('[id="saveButton"]')
    .click()
    .wait(500)
}

function accessLongTermFromCareerPlanPage(){
  cy.get('[value="goal.long-term"]')
    .click()
    .wait(500)
}

function accessShortTermFromCareerPlanPage(){
  cy.get('[value="goal.short-term"]')
    .click()
    .wait(500)
}

function clearUserData() {
  cy.get('ion-header').within(() => {
    cy.get('[data-testid="hamburgerMenu"]')
      .filter(':visible')
      .click()
      .wait(1000)
  })
  cy.get('ion-item').filter(':contains("Advanced")')
    .click()
    .wait(500)
  cy.get('[data-testid="clear-user-data"]')
    .click()
  cy.window().its('AdvancedPage', { timeout: 60000 }).should('have.property', 'loading').should('eq', false)
  cy.get('#backbutton')
    .click()
    .wait(500)
}

function accessCareerPlanFromHomePage() {
  cy.get('[class="inspiration"]').within(() => {
    cy.get('[name="disc-outline"]')
      .click()
      .wait(500)
  })
}