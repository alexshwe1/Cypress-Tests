const helperMethods = require('./helperMethods.js');
const progressBarHelperMethods = require('./progressBarHelperMethods.js');

/**
 * This .js file contains the cypress scripts to test the ask stat card.
 */
describe('Ask Stats card tests', () => {
  it('After clearing user data, verify initial state of stats cards', () => {
    helperMethods.accessHomePage()
    helperMethods.clearUserData()
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkClearedData('app-ask-stats-card', '6', /Asks to Go: (\d+) \/ (\d+)/, /Months to Go: (\d+) \/ (\d+)/)
  })

  it('Add "I asked" event. Click Quick Add (+), click Efforts/Ask/I asked/New Ask, complete form and save. Verify event count (numerator) increases and progress bar % is correct', () => {
    helperMethods.accessStatsTab()
    progressBarHelperMethods.getProgressNumeratorBefore(/Asks to Go: (\d+) \/ (\d+)/, 'app-ask-stats-card')
    progressBarHelperMethods.addNewEffort("Ask", "I asked", "New Ask", '[id="DeliverAskAction.empowered"]', '[id="DeliverAskAction.clarity"]', '[id="DeliverAskAction.confidence"]', '[id="DeliverAskAction.warmth"]')
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressNumeratorAfter(/Asks to Go: (\d+) \/ (\d+)/, 1, 'app-ask-stats-card')
    helperMethods.checkEventProgressBars('app-ask-stats-card', /Asks to Go: (\d+) \/ (\d+)/)
  })

  it('Delete "I asked" event. Click Track/Entries/Asks. Click "Unnamed Ask" card, click ellipsis on "I asked" card. Click Delete. Click back, click back, click Stats segment on Track page. Verify event count (numerator) decreases and progress bar % is correct', () => {
    helperMethods.accessStatsTab()
    progressBarHelperMethods.getProgressNumeratorBefore(/Asks to Go: (\d+) \/ (\d+)/, 'app-ask-stats-card')
    helperMethods.handleDeleteEffort("Asks")
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressNumeratorAfter(/Asks to Go: (\d+) \/ (\d+)/, -1, 'app-ask-stats-card')
    helperMethods.checkEventProgressBars('app-ask-stats-card', /Asks to Go: (\d+) \/ (\d+)/)
  })

  it('Set ask start date earlier, verify weeks and event counts (denominators) increase and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="AskStatsConfig.askStartDate"]', true)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("AskStatsConfig.askStartDate", "AskStatsConfig.askEndDate", 'app-ask-stats-card', 'months', 6)
    helperMethods.checkEventProgressBars('app-ask-stats-card', /Asks to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-ask-stats-card', /Months to Go: (\d+) \/ (\d+)/)
  })

  it('Set ask end date later, verify weeks and event counts (denominators) increase and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="AskStatsConfig.askEndDate"]', false)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("AskStatsConfig.askStartDate", "AskStatsConfig.askEndDate", 'app-ask-stats-card', 'months', 6)
    helperMethods.checkEventProgressBars('app-ask-stats-card', /Asks to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-ask-stats-card', /Months to Go: (\d+) \/ (\d+)/)
  })

  it('Set ask period start date later, verify weeks and event counts (denominators) decrease and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="AskStatsConfig.askStartDate"]', false)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("AskStatsConfig.askStartDate", "AskStatsConfig.askEndDate", 'app-ask-stats-card', 'months', 6)
    helperMethods.checkEventProgressBars('app-ask-stats-card', /Asks to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-ask-stats-card', /Months to Go: (\d+) \/ (\d+)/)
  })

  it('Set ask period end date earlier, verify weeks and event counts (denominators) decrease and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="AskStatsConfig.askEndDate"]', true)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("AskStatsConfig.askStartDate", "AskStatsConfig.askEndDate", 'app-ask-stats-card', 'months', 6)
    helperMethods.checkEventProgressBars('app-ask-stats-card', /Asks to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-ask-stats-card', /Months to Go: (\d+) \/ (\d+)/)
  })

  it('Set pitch target level High, verify event counts is 2x what it was and progress bar % is correct', () => {
    helperMethods.accessStatsTab()
    progressBarHelperMethods.getProgressDenominatorBeforeSettingTargetLevel(/Asks to Go: (\d+) \/ (\d+)/, 'app-ask-stats-card', 2)
    helperMethods.accessHomePage()
    helperMethods.handleSetTargetLevel('[id="AskStatsConfig.targetAsks"]')
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressDenominatorAfterSettingTargetLevelHigh(/Asks to Go: (\d+) \/ (\d+)/, 'app-ask-stats-card')
    helperMethods.checkEventProgressBars('app-ask-stats-card', /Asks to Go: (\d+) \/ (\d+)/)
  })

  it('Verify that info icon displays "Ask for What You Need Info" chat page and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testInfoIcon('app-ask-stats-card', 'Ask for What You Need Stats Info', 'Ask for What You Need')
  })

  it('Verify that pencil icon displays "Ask for What You Need" chat page (no need to test full chat) and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testPencilIcon('app-ask-stats-card', 'Ask For What You Need Stats', 'Ask for What You Need')
  })
})