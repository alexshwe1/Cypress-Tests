exports.checkEventProgressBars = checkEventProgressBars
exports.checkWeeksProgressBars = checkWeeksProgressBars
exports.setDates = setDates
exports.compareDates = compareDates
exports.addSatisfaction = addSatisfaction
exports.deleteSatisfaction = deleteSatisfaction
exports.accessStatsTab = accessStatsTab
exports.clearUserData = clearUserData
exports.accessHomePage = accessHomePage
exports.handleDeleteEffort = handleDeleteEffort
exports.handleSetTargetLevel = handleSetTargetLevel
exports.testInfoIcon = testInfoIcon
exports.testPencilIcon = testPencilIcon

function testPencilIcon(whichStatsCard, pencilMessage, statCardMessage) {
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="pencil-icon"]')
        .click({force: true})
    })
  })
  cy.get('.conversation-title')
    .should('contain', pencilMessage)
  cy.get('.buttons-first-slot > .header-button')
    .click()
    .wait(1000)
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="card-title"]')
        .should('contain', statCardMessage)
    })
  })
}

function testInfoIcon(whichStatsCard, infoMessage, statCardMessage) {
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="info-icon"]')
        .click({force: true})
    })
  })
  cy.get('.conversation-title')
    .should('contain', infoMessage)
  cy.get('.ion-padding')
    .click({force: true})
    .wait(1000)
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="card-title"]')
        .should('contain', statCardMessage)
    })
  })
}

function handleSetTargetLevel(settingsPageID) {
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
  cy.get(settingsPageID).within(() => {
    cy.get('mat-select')
      .click()
      .wait(500)
  })
  cy.get('mat-option').filter(':contains("High")')
    .click()
    .wait(500)
  cy.get('[name="chevron-back"]')
    .click({force: true})
}

function handleDeleteEffort(whichEffort) {
  cy.get('[data-testid="entries-button"]')
    .click()
    .wait(500)
  cy.get('ion-label').filter(`:contains("${whichEffort}")`)
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
}

function accessHomePage() {
  cy.get('#tab-button-home')
    .click()
    .wait(500)
}

function clearUserData() {
  cy.get('ion-header').within(() => {
    cy.get('[data-testid="hamburgerMenu"]')
      .filter(':visible')
      .click({force: true})
      .wait(500)
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

function accessStatsTab() {
  cy.get('#tab-button-career')
    .click({force: true})
    .wait(1000)
  cy.get('[value="stats"]')
    .click()
    .wait(1000)
}

function addSatisfaction(whichLevel) {
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
  cy.get('[id="Name your Work"]').within(() => {
    cy.get('input')
      .click()
        .type('Test')
  })
  if(whichLevel === "Low") {
    cy.get('ion-segment-button').filter(':contains("Low")')
    .click()
  } else if(whichLevel === "Med") {
    cy.get('ion-segment-button').filter(':contains("Med")')
    .click()
  } else {
    cy.get('ion-segment-button').filter(':contains("High")')
    .click()
  }
  cy.get('#saveButton')
    .click()
  accessStatsTab()
  cy.wait(2000)
  cy.get('app-career').within(() => {
    cy.get(`[data-testid="circle-value-${satisfactionLevel}"]`).invoke('text').then((text) => {
      expect(Number(text)).to.equal(circleNumbers)
    })
  })
}

function deleteSatisfaction(whichLevel) {
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
  accessStatsTab()
  cy.get('app-career').within(() => {
    cy.get(`[data-testid="circle-value-${satisfactionLevel}"]`).invoke('text').then((text) => {
      satisfactionCount = satisfactionCount - 1
      expect(Number(text)).to.equal(satisfactionCount)
    })
  })
}

function checkEventProgressBars(whichStatsCard, eventsRegex) {
  //ensure that event progress bar is correct
  var fractionEvents
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="events-progress-message"]').invoke('text').then((text) => {
        let eventsRE = text.match(eventsRegex)
        var eventsNum = eventsRE[1] //parse progress label to get numerator
        var eventsDenom = eventsRE[2] //parse progress label to get denominator
        fractionEvents = eventsNum / eventsDenom //compute percent progress
      })
      cy.get('[data-testid="eventRight"]')
        .invoke('css', 'width') //get the width of the accomplishments progress
        .then((result) => {
            var percent = parseInt(result, 10); //remove the "px" from width
            var widthPix = 168.77
            var percentWidth = percent / widthPix //compute percent of progress bar filled
            var difference = Math.abs(fractionEvents - percentWidth) //compute the difference between progress bar and progress message
            expect(difference).to.be.lessThan(0.50)
      })
    })
  })
}

function checkWeeksProgressBars(whichStatsCard, weeksRegex) {
  //ensure that weeks progress bar is correct
  var fractionWeeks
  cy.get('app-career').within(() => {
    cy.get(whichStatsCard).within(() => {
      cy.get('[data-testid="weeks-progress-message"]').invoke('text').then((text) => {
        let weeksRE = text.match(weeksRegex)
        var weeksNum = weeksRE[1]
        var weeksDenom = weeksRE[2]
        fractionWeeks = weeksNum / weeksDenom //compute percent progress
      })
      cy.get('[data-testid="weeksRight"]')
        .invoke('css', 'width') //get the width of the accomplishments progress
        .then((result) => {
          var percent = parseInt(result, 10); //remove the "px" from width
          var widthPix = 168.77
          var percentWidth = percent / widthPix //compute percent of progress bar filled
          var difference = Math.abs(fractionWeeks - percentWidth) //compute the difference between progress bar and progress message
          expect(difference).to.be.lessThan(0.50)
      })
    })
  })
}

function setDates(idString, isDateEarlier) {
    var month
    var day
    var year
    var newMonth
    var newYear
    cy.wait(1000)
    //set the start or end date earlier or later
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
    cy.get(idString).within(() => {
      cy.get('input').invoke('val').then((text) => {
        month = text.split('/')[0]
        day = text.split('/')[1]
        year = text.split('/')[2]
        if(isDateEarlier) {
            if (month != 1) {
                newMonth = Number(month) - 1
                newYear = year
            } else {
                newMonth = 12
                newYear = Number(year) - 1
            }
        } else {
            if (month != 12) {
                newMonth = Number(month) + 1
                newYear = year
            } else {
                newMonth = 1
                newYear = Number(year) + 1
            }
        }
      })
    })
    cy.get(idString).within(() => {
      cy.get('input')
        .clear()
        .type(newMonth + '/' + day + '/' + newYear)
    })
    //return to home page
    cy.get('[name="chevron-back"]')
      .click({force: true})
}

function compareDates(whichUserKeyStardDate, whichUserKeyEndDate, whichStatsCard, weeksOrMonths, eventsDenominatorPlace) {
  var weekDenominator
  var eventDenominator
  cy.get(whichStatsCard).within(() => {
    cy.get('[data-testid="events-progress-message"]').invoke('text').then((text) => {
      eventDenominator = text.split(' ')[eventsDenominatorPlace] //parse progress label to get denominator
    })
    cy.get('[data-testid="weeks-progress-message"]').invoke('text').then((text) => {
      weekDenominator = text.split(' ')[6] //parse progress label to get denominator
    })
  })
  //compare the new denominator to the old one. Should be ~4 weeks longer or shorter
  let startDate
  let endDate
  var weeksBetween
  cy.window()
    .its('HomePage')
    .should('have.property', 'userService').then(userService => {
      startDate = userService.getUserKey(whichUserKeyStardDate)
  })
  cy.window()
    .its('HomePage')
    .should('have.property', 'userService').then(userService => {
      endDate = userService.getUserKey(whichUserKeyEndDate)
  })
  cy.window()
    .its('HomePage', { timeout: 15000 })
      .should('have.property', 'dateService').then(dateService => {
        weeksBetween = dateService.diff(startDate, endDate, weeksOrMonths)
        expect(weeksBetween).to.equal(Number(weekDenominator)) 
        expect(weeksBetween).to.equal(Number(eventDenominator))
  })
}