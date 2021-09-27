exports.checkClearedData = checkClearedData
exports.verifySatisfactionStatusDisplays = verifySatisfactionStatusDisplays
exports.addSatisfactionAndCheckCircles = addSatisfactionAndCheckCircles
exports.deleteSatisfactionAndCheckCircles = deleteSatisfactionAndCheckCircles
exports.getStartDateAndCreateSatisfactionBeforeStart = getStartDateAndCreateSatisfactionBeforeStart
exports.getSatisfactionCircleValueBefore = getSatisfactionCircleValueBefore
exports.checkSatisfactionCircleValueAfter = checkSatisfactionCircleValueAfter
exports.setDateTwoMonthsBack = setDateTwoMonthsBack
const helperMethods = require('./helperMethods.js')
let circleText
var circleNumbers

function setDateTwoMonthsBack() {
  var month
  var day
  var year
  var newMonth
  var newYear
  cy.wait(1000)
  //get the start date
  cy.get('ion-header').within(() => {
    cy.get('[data-testid="hamburgerMenu"]')
      .filter(':visible')
      .click()
      .wait(1000)
  })
  cy.get('ion-item').filter(':contains("Settings")')
    .click()
    .wait(1000)
  cy.get('[data-testid=statstab]')
    .click()
    .wait(1000)
  cy.get('[id="StatsConfig.satisfactionStartDate"]').within(() => {
    cy.get('input').invoke('val').then((text) => {
      month = text.split('/')[0]
      day = text.split('/')[1]
      year = text.split('/')[2]
      if (month == 1) {
        newMonth = 11
        newYear = Number(year) - 1
      } else if(month == 2){
        newMonth = 12
        newYear = Number(year) - 1
      } else {
        newMonth = Number(month) - 2
        newYear = year
      }
    })
  })
  cy.get('[id="StatsConfig.satisfactionStartDate"]').within(() => {
    cy.get('input')
      .clear()
      .type(newMonth + '/' + day + '/' + newYear)
  })
  //return to home page
  cy.get('[name="chevron-back"]')
    .click({force: true})
}

function getSatisfactionCircleValueBefore(circleNumbersDifference) {
  cy.get('app-career').within(() => {
    cy.get('[data-testid="circle-value-0"]').invoke('text').then((text) => {
      circleText = text
      circleNumbers = Number(circleText) + circleNumbersDifference
    })
  })
}

function checkSatisfactionCircleValueAfter() {
  cy.get('app-career').within(() => {
    cy.get('[data-testid="circle-value-0"]', {timeout: 15000}).invoke('text').then((text) => {
      expect(Number(text)).to.equal(circleNumbers)
    })
  })
}

function getStartDateAndCreateSatisfactionBeforeStart() {
  var month
  var day
  var year
  var newMonth
  var newYear
  cy.wait(1000)
  //get the start date
  helperMethods.accessHomePage()
  cy.get('ion-header').within(() => {
    cy.get('[data-testid="hamburgerMenu"]')
      .filter(':visible')
      .click()
      .wait(1000)
  })
  cy.get('ion-item').filter(':contains("Settings")')
    .click()
    .wait(1000)
  cy.get('[data-testid=statstab]')
    .click()
    .wait(1000)
  cy.get('[id="StatsConfig.satisfactionStartDate"]').within(() => {
    cy.get('input').invoke('val').then((text) => {
      month = text.split('/')[0]
      day = text.split('/')[1]
      year = text.split('/')[2]
      if (month != 1) {
        newMonth = Number(month) - 1
        newYear = year
      } else {
        newMonth = 12
        newYear = Number(year) - 1
      }
    })
  })
  //return to home page
  cy.get('[name="chevron-back"]')
    .click({force: true})
  //create new satisfaction with original date
  cy.get('#pinkPlusButton')
    .click()
    .wait(1000)
  cy.get('button').filter(':contains("Satisfaction")')
    .click()
    .wait(1000)
  cy.get('[id="Name what you are doing"]').within(() => {
    cy.get('input')
      .click()
        .type('Test')
  })
  cy.get('[id="TrackSatisfactionAction.satisfaction"]').within(() => {
    cy.get('ion-segment-button').filter(':contains("Low")')
      .click()
  })
  cy.get('ion-chip').filter(':contains("Meeting")')
    .click()
  cy.get('ion-chip').filter(':contains("6am-9am")')
    .click()
  cy.get('[id="TrackSatisfactionAction.workLocation"]').within(() => {
    cy.get('[role="combobox"]')
      .click()
  })
  cy.get('[role="listbox"]').within(() => {
    cy.get('mat-option').filter(':contains("Home")')
      .click()
  })
  cy.get('[id="TrackSatisfactionAction.workingWith"]').within(() => {
    cy.get('[role="combobox"]')
      .click()
  })
  cy.get('[role="listbox"]').within(() => {
    cy.get('mat-option').filter(':contains("Solo")')
      .click()
  })
  cy.get('[id="TrackSatisfactionAction.timePassage"]').within(() => {
    cy.get('ion-segment-button').filter(':contains("Slow")')
      .click()
  })
  cy.get('[id="TrackSatisfactionAction.energy"]').within(() => {
    cy.get('ion-segment-button').filter(':contains("Low")')
      .click()
  })
  cy.get('[id="TrackSatisfactionAction.calm"]').within(() => {
    cy.get('ion-segment-button').filter(':contains("Stressed")')
      .click()
  })
  cy.get('ion-card-subtitle').filter(':contains("Details")')
    .click()
  cy.get('[id="TrackSatisfactionAction.actionDate"]').within(() => {
    cy.get('input')
      .clear()
      .type(newMonth + '/' + day + '/' + newYear)
  })
  cy.get('#saveButton')
    .click()
    .wait(1000)
}

function addSatisfactionAndCheckCircles(whichLevel) {
  var satisfactionLevel
  if(whichLevel ==="Low") {
    satisfactionLevel = 0
  } else if(whichLevel === "Med") {
    satisfactionLevel = 1
  } else{
    satisfactionLevel = 2
  }
  let circleText
  var circleNumbers
  cy.get(`[data-testid="circle-value-${satisfactionLevel}"]`).invoke('text').then((text) => {
    circleText = text
    circleNumbers = Number(circleText) + 1
  })
  cy.get('#pinkPlusButton')
    .click()
    .wait(1000)
  cy.get('button').filter(':contains("Satisfaction")')
    .click()
    .wait(1000)
  cy.get('[id="Name what you are doing"]').within(() => {
    cy.get('input')
      .click()
        .type('Test')
  })
  if(whichLevel === "Low") {
    cy.get('[id="TrackSatisfactionAction.satisfaction"]').within(() => {
      cy.get('ion-segment-button').filter(':contains("Low")')
        .click()
    })
  } else if(whichLevel === "Med") {
    cy.get('[id="TrackSatisfactionAction.satisfaction"]').within(() => {
      cy.get('ion-segment-button').filter(':contains("Med")')
        .click()
    })
  } else {
    cy.get('[id="TrackSatisfactionAction.satisfaction"]').within(() => {
      cy.get('ion-segment-button').filter(':contains("High")')
        .click()
    })
  }
  cy.get('ion-chip').filter(':contains("Meeting")')
    .click()
  cy.get('ion-chip').filter(':contains("6am-9am")')
    .click()
  cy.get('[id="TrackSatisfactionAction.workLocation"]').within(() => {
    cy.get('[role="combobox"]')
      .click()
  })
  cy.get('[role="listbox"]').within(() => {
    cy.get('mat-option').filter(':contains("Home")')
      .click()
  })
  cy.get('[id="TrackSatisfactionAction.workingWith"]').within(() => {
    cy.get('[role="combobox"]')
      .click()
  })
  cy.get('[role="listbox"]').within(() => {
    cy.get('mat-option').filter(':contains("Solo")')
      .click()
  })
  cy.get('[id="TrackSatisfactionAction.timePassage"]').within(() => {
    cy.get('ion-segment-button').filter(':contains("Slow")')
      .click()
  })
  cy.get('[id="TrackSatisfactionAction.energy"]').within(() => {
    cy.get('ion-segment-button').filter(':contains("Low")')
      .click()
  })
  cy.get('[id="TrackSatisfactionAction.calm"]').within(() => {
    cy.get('ion-segment-button').filter(':contains("Stressed")')
      .click()
  })
  cy.get('#saveButton')
    .click()
  helperMethods.accessStatsTab()
  cy.wait(500)
  cy.get('app-career').within(() => {
    cy.get(`[data-testid="circle-value-${satisfactionLevel}"]`).invoke('text').then((text) => {
      expect(Number(text)).to.equal(circleNumbers)
    })
  })
}

function deleteSatisfactionAndCheckCircles(whichLevel) {
  var satisfactionLevel
  if(whichLevel ==="Low") {
    satisfactionLevel = 0
  } else if(whichLevel === "Med") {
    satisfactionLevel = 1
  } else{
    satisfactionLevel = 2
  }
  var satisfactionCount
  cy.get('app-career').within(() => {
    cy.get(`[data-testid="circle-value-${satisfactionLevel}"]`).invoke('text').then((text) => {
      satisfactionCount = text
    })
  })
  cy.get('app-career').within(() => {
    cy.get(`[data-testid="satisfaction-circles-${satisfactionLevel}"]`)
      .click()
      .wait(500)
  })
  cy.get('.cardname')
    .eq(0)
    .click()
    .wait(500)
  cy.get('.mat-menu-trigger')
    .click()
    .wait(500)
  cy.get('.mat-focus-indicator')
    .click()
    .wait(500)
  cy.get('button').filter(':contains("Yes")')
    .click()
    .wait(500)
  cy.get('#backbutton')
    .click()
  helperMethods.accessStatsTab()
  cy.get('app-career').within(() => {
    cy.get(`[data-testid="circle-value-${satisfactionLevel}"]`).invoke('text').then((text) => {
      satisfactionCount = satisfactionCount - 1
      expect(Number(text)).to.equal(satisfactionCount)
    })
  })
}

function checkClearedData() {
  cy.get('app-career').within(() => {
    for(let i = 0; i < 3; i++) {
      cy.get(`[data-testid="circle-value-${i}"]`)
        .should('have.text', '0')
    }
  })
}

function verifySatisfactionStatusDisplays() {
  cy.get('app-career').within(() => {
    cy.get('[data-testid="satisfaction-circles-0"]')
      .click()
  })
  cy.get('ion-title')
    .should('contain', 'Satisfaction Status')
  cy.get('#backbutton')
    .click()
}