const learnTestHelperMethods = require('./learnTestHelperMethods.js');
let currentSeries;

describe('Learn Sequence Tests', () => {
  it('On Advanced page, select "Reset Learn Sequence" and wait for it to complete.', () => {
    learnTestHelperMethods.clearUserData()
  })

  it('From Home, verify that the "learn card" (app-learn-card) displays the text "START LEARNING" and click the card.', () => {
    learnTestHelperMethods.testLearnCardMessage("START LEARNING", true)
  })

  it('Verify that the chat page displays (/conversation) and a dialog pops up with an OK button. Note the name of the series that is starting in the dialog (class "title"), e.g. "Get to Know Us". Click the OK button within 30 seconds (or else the dialog will disappear).', () => {
    currentSeries = "Get To Know Us"
    learnTestHelperMethods.ensureCurrentSeriesTitleAndClickOK(currentSeries)
  })

  it('Step through the Chat by clicking on the black next arrow to the right of the progress bar until you reach the completion card page', () => {
    learnTestHelperMethods.stepThroughChat()
  })

  it('On the completion card, verify that a "Start Next Chat" button is present, as well as a "Not now" text (class "notnowbutton"). Click the "Not now" text.', () => {
    learnTestHelperMethods.verifyCompletionCardAndClickNotNow("Start Next Chat")
  })

  it('Verify that the Home page displays and that the learn card now displays "KEEP LEARNING"', () => {
    learnTestHelperMethods.testLearnCardMessage("KEEP LEARNING", false)
  })

  it('Verify that the progress bar in the learn card shows no progress', () => {
    learnTestHelperMethods.checkProgressBar()
  })

  it('Now click on the Learn icon in the toolbar at the bottom of the page. Verify that the Explore segment is selected.', () => {
    learnTestHelperMethods.clickLearnAndCheckExploreIsSelected()
  })

  it('In the list of displayed series names, locate the name of the current series, for which you just completed the first chat. Verify that the list item displaying the series name also displays a lock icon at the end of the item.', () => {
    learnTestHelperMethods.locateSeriesNameAndTestIcon(true, currentSeries)
  })

  it('Verify that clicking on the list item for the current series has no effect, i.e. its locked.', () => {
    learnTestHelperMethods.clickSeriesListItemAndCheckPage(currentSeries, true, null)
  })

  it('Click on the Home icon in the bottom toolbar to return to the Home page.', () => {
    learnTestHelperMethods.accessHomePage()
  })

  it('Verify that the Home page displays and the learn card now displays "KEEP LEARNING"', () => {
    learnTestHelperMethods.testLearnCardMessage("KEEP LEARNING", true)
  })

  it('Click on the learn card and verify that the title of the series is the current series. Click the OK button in the dialog.', () => {
    learnTestHelperMethods.ensureCurrentSeriesTitleAndClickOK(currentSeries)
  })

  it('As above, step through the Chat by clicking on the black next arrow to the right of the progress bar until you reach the completion card page', () => {
    learnTestHelperMethods.stepThroughChat()
  })

  it('Continue stepping through each chat, checking for errors, until you reach a completion card that has a "Start Next Series" button.', () => {
    learnTestHelperMethods.verifyCompletionCardAndClickNotNow("Start Next Series")
  })

  it('Verify that the Home page displays and that the learn card displays "KEEP LEARNING"', () => {
    learnTestHelperMethods.testLearnCardMessage("KEEP LEARNING", false)
  })

  it('Verify that the progress bar in the learn card now shows progress, with one series completed' , () => {
    learnTestHelperMethods.checkProgressBar()
  })

  it('Now click on the Explore icon in the toolbar at the bottom of the page. Verify that the Explore segment is selected.', () => {
    learnTestHelperMethods.clickLearnAndCheckExploreIsSelected()
  })

  it('In the list of displayed series names, locate the name of the current series, which you just completed. Verify that the list item displaying the series name also displays a caret at the end of the item.', () => {
    learnTestHelperMethods.locateSeriesNameAndTestIcon(false, currentSeries)
  })

  it('Verify that clicking on the list item for the current series advances to a series page (/tabs/library/itemlist) entitled "Get to Know Us" (class title)', () => {
    learnTestHelperMethods.clickSeriesListItemAndCheckPage(currentSeries, false, 'Get To Know Us')
    learnTestHelperMethods.checkPathName('tabs/library/itemlist')
  })

  it('Click the back button in the page header and verify that you are back on the library page (/tabs/library)', () => {
    learnTestHelperMethods.clickBackButtonOnHeader('app-libraryitemlist')
    learnTestHelperMethods.checkPathName('tabs/library')
  })
})