exports.clickFirstSeriesInHotTopics = clickFirstSeriesInHotTopics
exports.clickFirstChatInSeriesList = clickFirstChatInSeriesList
exports.setCurrSeries = setCurrSeries
exports.verifyReturnToSeriesList = verifyReturnToSeriesList
exports.checkProgressBarInSeries = checkProgressBarInSeries
exports.checkChatBoxIsChecked = checkChatBoxIsChecked
exports.pinChat = pinChat
exports.clearAllUserData = clearAllUserData
exports.clickElipsisMenuInSeriesHeader = clickElipsisMenuInSeriesHeader
exports.clickButton = clickButton
exports.clickPinnedInExploreMenu = clickPinnedInExploreMenu
exports.saveCurrentChat = saveCurrentChat
exports.checkCurrChatIsPinned = checkCurrChatIsPinned
exports.clickMyListInExlporeMenu = clickMyListInExlporeMenu
exports.unpinChat = unpinChat
exports.removeChatFromList = removeChatFromList
exports.ensurePinnedListIsEmpty = ensurePinnedListIsEmpty
exports.ensureChatIsNotInMyList = ensureChatIsNotInMyList

function ensureChatIsNotInMyList(whichChat) {
  cy.get('app-chat-library-card').within(() => {
    cy.get('ion-card-title').eq(0).invoke('text').should('not.contain', whichChat)
  })
}

function ensurePinnedListIsEmpty() {
  cy.get('app-library4').within(() => {
    cy.get('ion-card').should('not.exist')
  })
}

function removeChatFromList() {
  cy.get('app-chat-library-card')
  .eq(0)
  .within(() => {
    cy.get('[name="ellipsis-horizontal"]')
      .click({force:true})
  })
  cy.get('button').filter(':contains("Remove from Pinned")')
    .click()
}

function unpinChat() {
  cy.get('app-chat-library-card')
    .eq(0)
    .within(() => {
      cy.get('[name="ellipsis-horizontal"]')
        .click({force:true})
    })
  cy.get('button').filter(':contains("Remove from My List")')
    .click()
}

function clickMyListInExlporeMenu() {
  cy.get('[value="playlist"]')
    .click()
    .wait(500)
}

function saveCurrentChat() {
  cy.get('*[class^="conversation-title"]').invoke('text').then((text) => { 
    let chatRegex = text.match(/^[^-]*[^ -]/)
    let chatCurr = (chatRegex[0])
    Cypress.env('currChat', chatCurr)
  })
}

function checkCurrChatIsPinned(whichChat) {
  cy.get('app-chat-library-card').within(() => {
    cy.get('ion-card-title').eq(0).invoke('text').then((text) => { 
      expect(whichChat).to.contain(text)
    })
  })
}

function clickPinnedInExploreMenu() {
  cy.get('[value="pinned"]')
    .click()
    .wait(500)
}

function clickButton(buttonText) {
  cy.get('button').filter(`:contains(${buttonText})`)
    .click()
    .wait(500)
}

function clickElipsisMenuInSeriesHeader() {
  cy.get('app-libraryitemlist').within(() => {
    cy.get('ion-header').within(() => {
      cy.get('[name="ellipsis-horizontal"]')
        .click()
        .wait(500)
    })
  })
}

function clearAllUserData() {
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

function pinChat() {
  cy.get('*[class^="chat-list"]').within(() => {
    cy.get('app-chat-library-card')
      .eq(0)
      .within(() => {
        cy.get('[name="ellipsis-horizontal"]')
          .click({force:true})
      })
  })
  cy.get('button').filter(':contains("Pin Chat")')
    .click()
}

function checkChatBoxIsChecked() {
  cy.get('*[class^="chat-list"]').within(() => {
    cy.get('app-chat-library-card')
      .eq(0)
      .within(() => {
        cy.get('*[class^="chat-checkbox"]').shadow().within(() => {
          cy.get('title').should('have.text', 'Checkbox')
        })
      })
  })
}

function checkProgressBarInSeries() {
  var progress
  cy.get('app-libraryitemlist').within(() => {
    cy.get('*[class^="series-completion-description"]').invoke('text').then((text) => {
      let progressRE = text.match(/(\d+) of (\d+) completed/)
      var progressNum = progressRE[1]
      var progressDenom = progressRE[2]
      progress = progressNum / progressDenom
    })
  })
  cy.get('app-libraryitemlist').within(() => {
    cy.get('ion-progress-bar')
      .should('have.attr', 'aria-valuenow', progress)
  })
}

function verifyReturnToSeriesList(whichSeries) {
  cy.get('[data-testid="series-title"]').then(($txt) => { 
    expect($txt.text()).to.equal(whichSeries)
  })
}

function setCurrSeries() {
  cy.get('[data-testid="series-title"]').then(($txt) => { 
    Cypress.env({currSeries: ($txt.text())})
  })
}

function clickFirstSeriesInHotTopics() {
  cy.get('ion-list').filter(':contains("Hot Topics")').within(() => {
    cy.get('ion-item')
      .eq(1)
      .click()
  })
}

function clickFirstChatInSeriesList() {
  cy.get('*[class^="chat-list"]').within(() => {
    cy.get('app-chat-library-card')
      .eq(0)
      .click()
  })
}