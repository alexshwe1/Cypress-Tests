const careerPlanHelperMethods = require('./careerPlanHelperMethods.js');

/**
 * This .js file contains the cypress scripts to test the career planning component
 */
describe('Career Plan Tests', () => {
  it('Clear user data, to ensure there are no Goals, Objectives, Motivations', () => {
    careerPlanHelperMethods.clearUserData()
  })

  it('From Home, click on the Plan button in the Reflect panel', () => {
    careerPlanHelperMethods.accessCareerPlanFromHomePage()
  })

  it('Verify that the SHORT TERM segment is selected and that there are no Goals listed.', () => {
    careerPlanHelperMethods.accessShortTermFromCareerPlanPage()
    cy.get('[id="goalCard"]').within(() => {
      cy.get('ion-card-content').should('not.exist')
    })
  })

  it('Verify that the + icon appears next to Goals, but no such icon appears in the Motivations and Objectives panels.', () => {
    careerPlanHelperMethods.ensureOnlyGoalPlusSignIsVisible()
  })

  it('Click on the Goals + icon. Verify that Short Term is preset on the entry form for Goal type field. Assign name ST Goal 1. Click Save.', () => {
    careerPlanHelperMethods.addGoal("Short Term", "ST Goal 1")
  })

  it('Verify that ST Goal 1 appears in Goal list. Verify that Motivations and Objectives both now display + icon.', () => {
    cy.get('[id="goalCard"]').within(() => {
      cy.get('ion-card-content').should('have.text', 'ST Goal 1')
    })
    cy.get('[id="motivationCard"]').within(() => {
      cy.get('[name="add-circle-outline"]').should('be.visible')
    })
    cy.get('[id="objectiveCard"]').within(() => {
      cy.get('[name="add-circle-outline"]').should('be.visible')
    })
  })

  it('Click on Motivations + icon. Verify that associated goal is preset to "ST Goal 1". Assign name ST Mot 1. Click Save.', () => {
    careerPlanHelperMethods.addMotOrObj(true, "ST Mot 1")
  })

  it('Verify that ST Mot 1 appears in Motivation list.', () => {
    cy.get('[id="motivationCard"]').within(() => {
      cy.get('ion-card-content').should('have.text', 'ST Mot 1')
    })
  })

  it('Click on Objectives + icon. Verify that associated goal is preset to "ST Goal 1". Assign name ST Obj 1. Click Save.', () => {
    careerPlanHelperMethods.addMotOrObj(false, "ST Obj 1")
  })

  it('Verify that ST Obj 1 appears in Motivation list.', () => {
    cy.get('[id="objectiveCard"]').within(() => {
      cy.get('ion-card-content').should('have.text', 'ST Obj 1')
    })
  })

  it('Click on Goals + icon. Assign name ST Goal 2. Click Save.', () => {
    careerPlanHelperMethods.addGoal("Short Term", "ST Goal 2")
  })

  it('Verify that only ST Goal 2 appears in Goals list. Verify that no Objectives and Motivations are listed.', () => {
    cy.get('[id="goalCard"]').within(() => {
      cy.get('ion-card-content').should('have.text', 'ST Goal 2')
    })
    cy.get('[id="motivationCard"]').within(() => {
      cy.get('ion-card-content').should('not.exist')
    })
    cy.get('[id="objectiveCard"]').within(() => {
      cy.get('ion-card-content')
        .should(($el) => {
          expect($el.text().trim()).equal(''); //change to the same logic as motivation card 
        })
    })
  })

  it('Verify that Change button appears in Goals panel.', () => {
    cy.get('[id="goalCard"]').within(() => {
      cy.get('ion-card-header').within(() => {
        cy.get('button').should('be.visible').and('have.attr', 'aria-haspopup', 'true') //data-testid="changeButton"
      })
    })
  })

  it('Click Change button and select ST Goal 1.', () => {
    cy.get('[id="goalCard"]').within(() => {
      cy.get('ion-card-header').within(() => {
        cy.get('button')
          .click()
          .wait(500)
      })
    })
    cy.get('[role="menu"]').within(() => {
      cy.get('button').filter(':contains("ST Goal 1")')
        .click()
        .wait(500)
    })
  })

  it('Verify that ST Goal 1 appears in Goals list and ST Mot 1 and ST Obj 1 appear in Motivations and Objectives, respectively.', () => {
    careerPlanHelperMethods.ensureEverythingFilled()
  })

  it('Select the LONG TERM segment at the top of the page.', () => {
    careerPlanHelperMethods.accessLongTermFromCareerPlanPage()
  })

  it('Verify that the + icon appears next to Goals, but no such icon appears in the Motivations and Objectives panels. (as above)', () => {
    careerPlanHelperMethods.ensureOnlyGoalPlusSignIsVisible()
  })

  it('Click on the Goals + icon. Verify that Long Term is preset on the entry form. Assign name LT Goal 1. Click Save.', () => {
    careerPlanHelperMethods.addGoal("Long Term", "LT Goal 1")
  })

  it('Verify that LT Goal 1 appears in Goal list. Verify that Motivations and Objectives both now display + icon.', () => {
    cy.get('[id="goalCard"]').within(() => {
      cy.get('ion-card-content').should('have.text', 'LT Goal 1')
    })
    cy.get('[id="motivationCard"]').within(() => {
      cy.get('[name="add-circle-outline"]').should('be.visible')
    })
    cy.get('[id="objectiveCard"]').within(() => {
      cy.get('[name="add-circle-outline"]').should('be.visible')
    })
  })

  it('Select the SHORT TERM segment at the top of the page.', () => {
    careerPlanHelperMethods.accessShortTermFromCareerPlanPage()
  })

  it('Verify that ST Goal 1 appears in Goal list and ST Mot 1 and ST Obj 1 appear in Motivations and Objectives, respectively.', () => {
    careerPlanHelperMethods.ensureEverythingFilled()
  })
})