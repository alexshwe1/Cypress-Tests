exports.clearUserData = clearUserData
exports.stepThroughChat = stepThroughChat
exports.testLearnCardMessage = testLearnCardMessage
exports.verifyCompletionCardAndClickNotNow = verifyCompletionCardAndClickNotNow
exports.checkProgressBar = checkProgressBar
exports.clickLearnAndCheckExploreIsSelected = clickLearnAndCheckExploreIsSelected
exports.ensureCurrentSeriesTitleAndClickOK = ensureCurrentSeriesTitleAndClickOK
exports.locateSeriesNameAndTestIcon = locateSeriesNameAndTestIcon
exports.clickSeriesListItemAndCheckPage = clickSeriesListItemAndCheckPage
exports.checkPathName = checkPathName
exports.clickBackButtonOnHeader = clickBackButtonOnHeader
exports.accessHomePage = accessHomePage
exports.clickNotNow = clickNotNow

function clickNotNow() {
  cy.get('*[class^="notnowbutton"]').should('contain', 'Not now')
    .click()
    .wait(1000)
}

function accessHomePage() {
  cy.get('[id="tab-button-home"]')
    .click()
    .wait(500)
}

function clickBackButtonOnHeader(appPage) {
  cy.get(appPage).within(() => {
    cy.get('ion-header').within(() => {
      cy.get('#backbutton')
        .click()
    })
  })
}

function clickSeriesListItemAndCheckPage(currentSeries, isSeriesLocked, classTitle) {
  if(isSeriesLocked) {
    cy.get('ion-item').filter(`:contains(${currentSeries})`)
      .click({force:true})
    cy.get('ion-item').filter(`:contains(${currentSeries})`)
      .should('exist')
  } else {
    cy.get('ion-item').filter(`:contains(${currentSeries})`)
      .click()
      .wait(500)
    cy.get('app-libraryitemlist').within(() => {
      cy.get('ion-content')
        .should('contain', classTitle)
    })
  }
}

function checkPathName(pathName) {
  cy.location().should((loc) => {
    expect(loc.pathname).to.contain(pathName)
  })
}

function locateSeriesNameAndTestIcon(isLockedIcon, currentSeries) {
  cy.get('ion-item').filter(`:contains(${currentSeries})`)
    .should('exist')
  if(isLockedIcon) {
    cy.get('ion-item').filter(':contains("Get To Know Us")').within(() => {
      cy.get('[data-testid="locked-icon"]')
        .should('exist')
    })
  } else {
    cy.get('ion-item').filter(':contains("Get To Know Us")').shadow().within(() => {
      cy.get('ion-icon').shadow().within(() => {
        cy.get('[class="icon-inner"]').should('contain', 'Chevron Forward')
      })
    })
  }
}

function ensureCurrentSeriesTitleAndClickOK(currentSeries) {
  cy.get('[class="title"]').should('contain', currentSeries)
  cy.get('ion-button').filter(':contains("OK")')
    .click()
  cy.get('app-conversation').should('be.visible')
}

function clickLearnAndCheckExploreIsSelected() {
  cy.get('[id="tab-button-library"]')
    .click()
    .wait(500)
  cy.get('[value="explore"]').should('have.attr', 'aria-selected', 'true')
}

function checkProgressBar() {
  var progress
  cy.get('app-learn-card').within(() => {
    cy.get('[class="completed"]').invoke('text').then((text) => {
      let progressRE = text.match(/Completed (\d+) of (\d+) Series/)
      var progressNum = progressRE[1]
      var progressDenom = progressRE[2]
      progress = progressNum / progressDenom
    })
  })
  cy.get('app-learn-card').within(() => {
    cy.get('ion-progress-bar')
      .should('have.attr', 'aria-valuenow', progress)
  })
}

function verifyCompletionCardAndClickNotNow(completionMessage) {
  cy.get('[id="startNow"]').should('contain', completionMessage)
  cy.get('*[class^="notnowbutton"]').should('contain', 'Not now')
    .click()
}

function testLearnCardMessage(message, performClick) {
  cy.get('app-learn-card').within(() => {
    cy.get('ion-card-header')
      .should('contain', message)
  })
  if(performClick) {
    cy.get('app-learn-card').within(() => {
      cy.get('ion-card-header')
        .click()
        .wait(500)
    })
  }
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
  cy.get('[data-testid="reset-learn-sequence"]')
    .click()
  cy.window().its('AdvancedPage', { timeout: 60000 }).should('have.property', 'loading').should('eq', false)
  cy.get('#backbutton')
    .click()
    .wait(500)
}

function stepThroughChat() {
  cy.wait(1000)
  cy.get('app-conversation').find('[name="caret-forward"]').invoke('is', ':visible').then((res) => {
    if(res){
      checkError()
      cy.get('[name="caret-forward"]')
        .click()
      stepThroughChat()
    }else{
      cy.get('app-end-conversation').should('be.visible')
    }
  })
}

const checkError = () => {
  cy.window().its('ConversationPage')
  .should('have.property', 'currerror')
  .then($currerror => {
      if ($currerror != null) {
          cy.log(`currerror: ${$currerror.error}`).then(() => {
            throw new Error(`Handle Bars or EnableIf error`)
          })
      } 
  })
}