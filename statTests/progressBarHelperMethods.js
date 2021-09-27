exports.checkClearedData = checkClearedData
exports.addNewEffort = addNewEffort
exports.getProgressNumeratorBefore = getProgressNumeratorBefore
exports.checkProgressNumeratorAfter = checkProgressNumeratorAfter
exports.getProgressDenominatorBeforeSettingTargetLevel = getProgressDenominatorBeforeSettingTargetLevel
exports.checkProgressDenominatorAfterSettingTargetLevelHigh = checkProgressDenominatorAfterSettingTargetLevelHigh
exports.checkReviewReadyProgressMessage = checkReviewReadyProgressMessage
exports.addAccomplishment = addAccomplishment
exports.deleteAccomplishment = deleteAccomplishment
const helperMethods = require('./helperMethods.js')
var eventsNum
var eventsNumInt
var eventsDenom
var eventsDenomInt

function deleteAccomplishment() {
  cy.get('[data-testid="entries-button"]')
    .click()
    .wait(500)
  cy.get('ion-label').filter(':contains("Accomplishments")')
    .click()
    .wait(500)
  cy.get('#ellipsisMenu')
    .click()
    .wait(500)
  cy.get('button').filter(':contains("Delete")')
    .click()
    .wait(500)
  cy.get('button').filter(':contains("Yes")')
    .click()
    .wait(500)
  cy.get('#backbutton')
    .click()
    .wait(500)
  cy.get('#tab-button-home')
    .click()
    .wait(500)
}

function addAccomplishment() {
  cy.get('#pinkPlusButton')
    .click()
    .wait(500)
  cy.get('button').filter(':contains("Accomplishment")')
    .click()
    .wait(500)
  cy.get('[id="Name Accomplishment"]').within(() => {
    cy.get('input')
      .click()
      .type('test')
  })
  cy.get('ion-segment-button').filter(':contains("High")')
    .click()
  cy.get('ion-segment-button').filter(':contains("Milestone")')
    .click()
  cy.get('ion-chip').filter(':contains("Meeting")')
    .click()
  cy.get('#saveButton')
    .click()
    .wait(1000)
  cy.get('.cancel-button')
    .click()
    .wait(500)
}

function checkReviewReadyProgressMessage() {
  let EventsRegEx = /Accomplishments to Go: (\d+) \/ (\d+)/
  let WeeksRegEx = /Weeks to Go: (\d+) \/ (\d+)/
  var weeksNum
  var weeksDenom
  var accNum
  var accDenom
  //parse weeks to go message
  helperMethods.accessStatsTab()
  cy.get('app-career').within(() => {
    cy.get('app-review-stats-card').within(() => {
      cy.get('[data-testid="weeks-progress-message"]').invoke('text').then((text) => {
        let weeksRegExMatched = text.match(WeeksRegEx)
        weeksNum = weeksRegExMatched[1] //parse weeks label to get numerator
        weeksDenom = weeksRegExMatched[2] //parse weeks label to get denominator
      })
    })
  })
  //parse accomplishments to go message
  cy.get('app-career').within(() => {
    cy.get('app-review-stats-card').within(() => {
      cy.get('[data-testid="events-progress-message"]').invoke('text').then((text) => {
        let EventsRegExMatched = text.match(EventsRegEx)
        accNum = EventsRegExMatched[1] //parse progress label to get numerator
        accDenom = EventsRegExMatched[2] //parse progress label to get denominator
        var weeksSoFar = weeksDenom - weeksNum
        var weeksProgress = Math.min(weeksSoFar, weeksDenom)
        var weeksProgPercent = (weeksProgress / weeksDenom) * 100
        var eventSoFar = accDenom - accNum
        var eventProgress = Math.min(eventSoFar, accDenom)
        var eventProgPercent = (eventProgress / accDenom) * 100
        var difference = (eventProgPercent - weeksProgPercent)/weeksProgPercent
        var status = difference > 0.20 ? 3 : difference < -0.20 ? 1 : 2
        if (eventProgPercent == 100 || weeksProgPercent == 100) {
          status = 0
        }
        if (eventProgPercent == 0 && weeksProgPercent == 0) {
          status = 4
        }
        let statusMessages = {
          0: "TIME",
          1: "CATCH",
          2: "YOU'VE",
          3: "THAT'S", 
          4: "STARTED",
        }
        const message = statusMessages[status]
        cy.get('.progress-message')
          .should('contain', message)
      })
    })
  })
}

function getProgressDenominatorBeforeSettingTargetLevel(eventsRegex, whichStatsCard, amountMultiplied) {
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="events-progress-message"]').invoke('text').then((text) => {
        let EventsRegExMatched = text.match(eventsRegex)
        eventsDenom = EventsRegExMatched[2] //parse events label to get denominator
        eventsDenomInt = Number(eventsDenom) * amountMultiplied
      })
    })
  })
}

function checkProgressDenominatorAfterSettingTargetLevelHigh(eventsRegex, whichStatsCard) {
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="events-progress-message"]', {timeout: 15000}).invoke('text').then((text) => {
        let EventsRegExMatched = text.match(eventsRegex)
        var eventsDenomNew = EventsRegExMatched[2] //parse events label to get numerator
        var eventsDenomIntNew = Number(eventsDenomNew)
        expect(eventsDenomIntNew).to.equal(eventsDenomInt)
      })
    })
  })
}

function getProgressNumeratorBefore(eventsRegEx, whichStatsCard) {
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="events-progress-message"]').invoke('text').then((text) => {
        let EventsRegExMatched = text.match(eventsRegEx)
        eventsNum = EventsRegExMatched[1] //parse events label to get numerator
        eventsNumInt = Number(eventsNum)
      })
    })
  })
}

function checkProgressNumeratorAfter(eventsRegEx, amountChanged, whichStatsCard) {
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="events-progress-message"]', {timeout: 15000}).invoke('text').then((text) => {
        let EventsRegExMatched = text.match(eventsRegEx)
        var eventsNumNew = EventsRegExMatched[1] //parse events label to get numerator
        var eventsNumIntNew = Number(eventsNumNew) + amountChanged
        expect(eventsNumIntNew).to.equal(eventsNumInt)
      })
    })
  })
}

function addNewEffort(firstButton, secondButton, thirdButton, effortButtonIDFirst, effortButtonIDSecond, effortButtonIDThird, effortButtonIDFourth) {
  cy.get('#pinkPlusButton')
    .click()
    .wait(500)
  cy.get('button').filter(':contains("Efforts")')
    .click()
    .wait(500)
  cy.get('button').filter(`:contains(${firstButton})`)
    .click()
    .wait(500)
  cy.get('button').filter(`:contains(${secondButton})`)
    .click()
    .wait(500)
  cy.get('button').filter(`:contains(${thirdButton})`)
    .click()
    .wait(500)
  cy.get('input')
    .click()
    .type("Test")
  cy.get('button').filter(':contains("Ok")')
    .click()
    .wait(1000)
  cy.get(effortButtonIDFirst).within(() => {
    cy.get('ion-segment-button').filter(':contains("Low")')
      .click()
  })
  cy.get(effortButtonIDSecond).within(() => {
    cy.get('ion-segment-button').filter(':contains("Low")')
      .click()
  })
  cy.get(effortButtonIDThird).within(() => {
    cy.get('ion-segment-button').filter(':contains("Low")')
      .click()
  })
  cy.get(effortButtonIDFourth).within(() => {
    cy.get('ion-segment-button').filter(':contains("Low")')
      .click()
  })
  cy.get('#saveButton')
    .click()
    .wait(500)
}

function checkClearedData(whichStatsCard, expectedNumber, eventsRegex, weeksRegex) {
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="events-progress-message"]').invoke('text').then((text) => {
        let eventsRE = text.match(eventsRegex)
        var numerator = eventsRE[1] //parse progress label to get numerator
        var denominator = eventsRE[2] //parse progress label to get denominator
        expect(numerator).to.equal(expectedNumber)
        expect(denominator).to.equal(expectedNumber)
      })
      cy.get('[data-testid="weeks-progress-message"]').invoke('text').then((text) => {
        let weeksRE = text.match(weeksRegex)
        var numerator = weeksRE[1] //parse progress label to get numerator
        var denominator = weeksRE[2] //parse progress label to get denominator
        expect(numerator).to.equal(expectedNumber)
        expect(denominator).to.equal(expectedNumber)
      })
    })
  })
}