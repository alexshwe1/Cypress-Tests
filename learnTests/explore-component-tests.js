const exploreTestHelperMethods = require('./exploreTestHelperMethods.js');
const learnTestHelperMethods = require('./learnTestHelperMethods.js');
let currentSeries;
let currentChat;

describe('Explore Component Tests', () => {
  it('On Advanced page, select "Reset Learn Sequence" and wait for it to complete.', () => {
    exploreTestHelperMethods.clearAllUserData()
  })

  it('Now click on the Learn icon in the toolbar at the bottom of the page. Verify that the Explore segment is selected.', () => {
    learnTestHelperMethods.clickLearnAndCheckExploreIsSelected()
  })

  it('Tap on the first Series name from the Hot Topics category', () => {
    exploreTestHelperMethods.clickFirstSeriesInHotTopics()
  })

  it('Tap on the first Chat card from the Series list', () => {
    exploreTestHelperMethods.setCurrSeries()
    currentSeries = (Cypress.env('currSeries'))
    exploreTestHelperMethods.clickFirstChatInSeriesList()
  })

  it('Complete the Chat by clicking on the black next arrow to the right of the progress bar until you reach the CompletionCard', () => {
    exploreTestHelperMethods.saveCurrentChat()
    currentChat = (Cypress.env('currChat'))
    learnTestHelperMethods.stepThroughChat()
  })

  it('Tap "Not Now" on the CompletionCard', () => {
    learnTestHelperMethods.clickNotNow()
  })

  it('Verify you return to the Series list', () => {
    exploreTestHelperMethods.verifyReturnToSeriesList(currentSeries)
  })

  it('Verify progress bar updates in Series list', () => {
    exploreTestHelperMethods.checkProgressBarInSeries()
  })

  it('Verify chat card shows a checkmark in the box on the bottom left of the Chat card', () => {
    exploreTestHelperMethods.checkChatBoxIsChecked()
  })

  it('Click "Pin Chat" from Chat card ellipsis menu', () => {
    exploreTestHelperMethods.pinChat()
  })

  it('Click "Add Chat to My List" from Chat Card ellipsis menu', () => {
    exploreTestHelperMethods.clickElipsisMenuInSeriesHeader()
    exploreTestHelperMethods.clickButton("Add Series to My List")
  })

  it('Verify Chat adds to Pinned', () => {
    learnTestHelperMethods.clickLearnAndCheckExploreIsSelected()
    exploreTestHelperMethods.clickPinnedInExploreMenu()
    exploreTestHelperMethods.checkCurrChatIsPinned(currentChat)
  })

  it('Verify Chat adds to My List', () => {
    exploreTestHelperMethods.clickMyListInExlporeMenu()
    exploreTestHelperMethods.checkCurrChatIsPinned(currentChat)
  })

  it('Click "Remove Chat from My List" by sliding card left', () => {
    exploreTestHelperMethods.unpinChat()
  })

  it('Click "Remove Chat from Pinned" by sliding card left', () => {
    exploreTestHelperMethods.clickPinnedInExploreMenu()
    exploreTestHelperMethods.removeChatFromList()
  })

  it('Verify Chat is removed from Pinned', () => {
    exploreTestHelperMethods.ensurePinnedListIsEmpty()
  })

  it('Verify Chat is removed from My List', () => {
    exploreTestHelperMethods.clickMyListInExlporeMenu()
    exploreTestHelperMethods.ensureChatIsNotInMyList()
  })
})
