const helperMethods = require('./helperMethods.js');
const marketSavvyHelperMethods = require('./marketSavvyHelperMethods.js');
const pitchPreppedHelperMethods = require('./pitchPreppedHelperMethods.js');
const satisfactionHelperMethods = require('./satisfactionHelperMethods.js');
const progressBarHelperMethods = require('./progressBarHelperMethods.js');

/**
 * This .js file contains the cypress scripts to test all of the stat cards
 */
describe('Stats Card Integration Test', () => {
  it('After clearing user data, verify initial state of stats cards', () => {
    helperMethods.accessHomePage()
    helperMethods.clearUserData()
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkClearedData('app-network-stats-card', '12', /Networking Moments to Go: (\d+) \/ (\d+)/, /Weeks to Go: (\d+) \/ (\d+)/)
    progressBarHelperMethods.checkClearedData('app-review-stats-card', '26', /Accomplishments to Go: (\d+) \/ (\d+)/, /Weeks to Go: (\d+) \/ (\d+)/)
    progressBarHelperMethods.checkClearedData('app-ask-stats-card', '6', /Asks to Go: (\d+) \/ (\d+)/, /Months to Go: (\d+) \/ (\d+)/)
    progressBarHelperMethods.checkClearedData('app-pitch-stats-card', '12', /Pitches to Go: (\d+) \/ (\d+)/, /Weeks to Go: (\d+) \/ (\d+)/)
    pitchPreppedHelperMethods.checkClearedData()
    marketSavvyHelperMethods.checkClearedData()
    satisfactionHelperMethods.checkClearedData()
  })

  it('Click on stats card Low circle, verify that "Satisfaction Status" page displays', () => {
    satisfactionHelperMethods.verifySatisfactionStatusDisplays()
  })

  it('Click on + button, add a Satisfaction entry with satisfaction level Low, verify only Low count increases on card', () => {
    satisfactionHelperMethods.addSatisfactionAndCheckCircles("Low")
  })

  it('Add a Satisfaction entry with satisfaction level Med, verify only Med count increases on card', () => {
    satisfactionHelperMethods.addSatisfactionAndCheckCircles("Med")
  })

  it('Add a Satisfaction entry with satisfaction level High, verify only High count increases on card', () => {
    satisfactionHelperMethods.addSatisfactionAndCheckCircles("High")
  })

  it('Remove Satisfaction entry with satisfaction level Low (click on entry card, click ellipsis, choose Delete), verify only Low count decreases on card', () => {
    satisfactionHelperMethods.deleteSatisfactionAndCheckCircles("Low")
  })

  it('Remove a Satisfaction entry with satisfaction level Med, verify only Med count decreases on card', () => {
    satisfactionHelperMethods.deleteSatisfactionAndCheckCircles("Med")
  })

  it('Remove a Satisfaction entry with satisfaction level High, verify only High count decreases on card', () => {
    satisfactionHelperMethods.deleteSatisfactionAndCheckCircles("High")
  })

  it('Add a Low Satisfaction entry with date before Satisfaction Start Date, verify Low count is unaffected on card', () => {
    helperMethods.accessStatsTab()
    satisfactionHelperMethods.getSatisfactionCircleValueBefore(0)
    satisfactionHelperMethods.getStartDateAndCreateSatisfactionBeforeStart()
    helperMethods.accessStatsTab()
    satisfactionHelperMethods.checkSatisfactionCircleValueAfter()
  })

  it('Set satisfaction tracking start date to earlier date, verify Low count increases on card', () => {
    satisfactionHelperMethods.getSatisfactionCircleValueBefore(1)
    helperMethods.accessHomePage()
    satisfactionHelperMethods.setDateTwoMonthsBack()
    helperMethods.accessStatsTab()
    satisfactionHelperMethods.checkSatisfactionCircleValueAfter()
  })

  it('Verify that info icon displays "Satisfaction at a Glance Info" chat page and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testInfoIcon('app-satisfaction-stats-card', 'Satisfaction at a Glance Info', 'Satisfaction at a Glance')
  })

  it('Verify that pencil icon displays "Satisfaction at a Glance Stats" chat page (no need to test full chat) and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testPencilIcon('app-satisfaction-stats-card', 'Satisfaction at a Glance Stats', 'Satisfaction at a Glance')
  })

  it('Add "I pitched" event. Click Quick Add (+), click Efforts/Pitch/I pitched/New Pitch, complete form and save. Verify event count (numerator) increases and progress bar % is correct', () => {
    helperMethods.accessStatsTab()
    progressBarHelperMethods.getProgressNumeratorBefore(/Pitches to Go: (\d+) \/ (\d+)/, 'app-pitch-stats-card')
    progressBarHelperMethods.addNewEffort("Pitch", "I pitched", "New Pitch", '[id="DeliverPitchAction.empowered"]', '[id="DeliverPitchAction.clarity"]', '[id="DeliverPitchAction.confidence"]', '[id="DeliverPitchAction.positivity"]')
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressNumeratorAfter(/Pitches to Go: (\d+) \/ (\d+)/, 1, 'app-pitch-stats-card')
    helperMethods.checkEventProgressBars('app-pitch-stats-card', /Pitches to Go: (\d+) \/ (\d+)/)
  })

  it('Delete "I pitched" event. Click Track/Pitches. Click "Unnamed Pitch" card, click ellipsis on "I pitched" card. Click Delete. Click back, click back, click Stats segment on Track page. Verify event count (numerator) decreases and progress bar % is correct', () => {
    helperMethods.accessStatsTab()
    progressBarHelperMethods.getProgressNumeratorBefore(/Pitches to Go: (\d+) \/ (\d+)/, 'app-pitch-stats-card')
    helperMethods.handleDeleteEffort("Pitches")
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressNumeratorAfter(/Pitches to Go: (\d+) \/ (\d+)/, -1, 'app-pitch-stats-card')
    helperMethods.checkEventProgressBars('app-pitch-stats-card', /Pitches to Go: (\d+) \/ (\d+)/)
  })

  it('Set pitch start date earlier, verify weeks and event counts (denominators) increase and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="PitchStatsConfig.pitchStartDate"]', true)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("PitchStatsConfig.pitchStartDate", "PitchStatsConfig.pitchEndDate", 'app-pitch-stats-card', 'weeks', 6)
    helperMethods.checkEventProgressBars('app-pitch-stats-card', /Pitches to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-pitch-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set pitch end date later, verify weeks and event counts (denominators) increase and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="PitchStatsConfig.pitchEndDate"]', false)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("PitchStatsConfig.pitchStartDate", "PitchStatsConfig.pitchEndDate", 'app-pitch-stats-card', 'weeks', 6)
    helperMethods.checkEventProgressBars('app-pitch-stats-card', /Pitches to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-pitch-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set pitch period start date later, verify weeks and event counts (denominators) decrease and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="PitchStatsConfig.pitchStartDate"]', false)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("PitchStatsConfig.pitchStartDate", "PitchStatsConfig.pitchEndDate", 'app-pitch-stats-card', 'weeks', 6)
    helperMethods.checkEventProgressBars('app-pitch-stats-card', /Pitches to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-pitch-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set pitch period end date earlier, verify weeks and event counts (denominators) decrease and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="PitchStatsConfig.pitchEndDate"]', true)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("PitchStatsConfig.pitchStartDate", "PitchStatsConfig.pitchEndDate", 'app-pitch-stats-card', 'weeks', 6)
    helperMethods.checkEventProgressBars('app-pitch-stats-card', /Pitches to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-pitch-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Verify that info icon displays "Talk Yourself Up Stats Info" chat page and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testInfoIcon('app-pitch-stats-card', 'Talk Yourself Up Stats Info', 'Talk Yourself Up')
  })

  it('Verify that pencil icon displays "Talk Yourself Up Stats" chat page (no need to test full chat) and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testPencilIcon('app-pitch-stats-card', 'Talk Yourself Up Stats', 'Talk Yourself Up')
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

  it("Review Ready card should display proper progress message", () => {
    progressBarHelperMethods.checkReviewReadyProgressMessage()
  })

  it('Create accomplishment, ensure width of white space in event progress bar equal to progress message', () => {
    helperMethods.accessHomePage()
    progressBarHelperMethods.getProgressNumeratorBefore(/Accomplishments to Go: (\d+) \/ (\d+)/, 'app-review-stats-card')
    progressBarHelperMethods.addAccomplishment()
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressNumeratorAfter(/Accomplishments to Go: (\d+) \/ (\d+)/, 1, 'app-review-stats-card')
    helperMethods.checkEventProgressBars('app-review-stats-card', /Accomplishments to Go: (\d+) \/ (\d+)/)
  })

  it('Delete accomplishment, verify event count (numerator) decreases and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    progressBarHelperMethods.getProgressNumeratorBefore(/Accomplishments to Go: (\d+) \/ (\d+)/, 'app-review-stats-card')
    helperMethods.accessStatsTab()
    progressBarHelperMethods.deleteAccomplishment()
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressNumeratorAfter(/Accomplishments to Go: (\d+) \/ (\d+)/, -1, 'app-review-stats-card')
    helperMethods.checkEventProgressBars('app-review-stats-card', /Accomplishments to Go: (\d+) \/ (\d+)/)
  })

  it('Set review period start date earlier, verify weeks and event counts (denominators) increase and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="ReviewConfig.reviewStartDate"]', true)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("ReviewConfig.reviewStartDate", "ReviewConfig.reviewEndDate", 'app-review-stats-card', 'weeks', 6)
    helperMethods.checkEventProgressBars('app-review-stats-card', /Accomplishments to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-review-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set review period end date later, verify weeks and event counts (denominators) increase and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="ReviewConfig.reviewEndDate"]', false)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("ReviewConfig.reviewStartDate", "ReviewConfig.reviewEndDate", 'app-review-stats-card', 'weeks', 6)
    helperMethods.checkEventProgressBars('app-review-stats-card', /Accomplishments to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-review-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set review period start date later, verify weeks and event counts (denominators) decrease and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="ReviewConfig.reviewStartDate"]', false)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("ReviewConfig.reviewStartDate", "ReviewConfig.reviewEndDate", 'app-review-stats-card', 'weeks', 6)
    helperMethods.checkEventProgressBars('app-review-stats-card', /Accomplishments to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-review-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set review period end date earlier, verify weeks and event counts (denominators) decrease and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="ReviewConfig.reviewEndDate"]', true)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("ReviewConfig.reviewStartDate", "ReviewConfig.reviewEndDate", 'app-review-stats-card', 'weeks', 6)
    helperMethods.checkEventProgressBars('app-review-stats-card', /Accomplishments to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-review-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Verify that info icon displays "Review Ready Stats Info" chat page and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testInfoIcon('app-review-stats-card', 'Review Ready Stats Info', 'Review Ready')
  })

  it('Verify that pencil icon displays "Review Ready Stats" chat page (no need to test full chat) and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testPencilIcon('app-review-stats-card', 'Review Ready Stats', 'Review Ready')
  })

  it('Add a Market Info event. Click Quick Add (+), click Market Info, complete form and save. Verify that grid contains a highlighted cell 1. Repeat until 9 entries are added and verify that all cells are highlighted.', () => {
    marketSavvyHelperMethods.addMarketInfoEventsAndCheckCells()
  })

  it('Delete a Market Info event. Verify that cell 9 is no longer highlighted.', () => {
    marketSavvyHelperMethods.delete9thCellAndCheck9thCell()
  })

  it('Set market savvy start date to tomorrow, verify that no cells are highlighted.', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="StatsConfig.marketStartDate"]', false)
    helperMethods.accessStatsTab()
    marketSavvyHelperMethods.goThroughCellsAndCheckStatus(10, 'savvy-incomplete')
  })

  it('Reset market savvy start date to 1 month ago, verify that 8 cells are now highlighted.', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="StatsConfig.marketStartDate"]', true)
    helperMethods.accessStatsTab()
    marketSavvyHelperMethods.goThroughCellsAndCheckStatus(9, 'savvy-complete')
  })

  it('Verify that info icon displays "Market Savvy Stats Info" chat page and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testInfoIcon('app-savvy-stats-card', "Market Savvy Stats Info", "Market Savvy")
  })

  it('Verify that pencil icon displays "Market Savvy Stats" chat page (no need to test full chat) and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testPencilIcon('app-savvy-stats-card', "Market Savvy Stats", "Market Savvy")
  })

  it('Add "I networked" event. Click Quick Add (+), click Efforts/Networking/I networked/New Network Lead, complete form and save. Verify event count (numerator) increases and progress bar % is correct', () => {
    helperMethods.accessStatsTab()
    progressBarHelperMethods.getProgressNumeratorBefore(/Networking Moments to Go: (\d+) \/ (\d+)/, 'app-network-stats-card')
    progressBarHelperMethods.addNewEffort("Networking", "I networked", "New Network Lead", '[id="NetworkAction.empowered"]', '[id="NetworkAction.energy"]', '[id="NetworkAction.confidence"]', '[id="NetworkAction.comfort"]')
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressNumeratorAfter(/Networking Moments to Go: (\d+) \/ (\d+)/, 1, 'app-network-stats-card')
    helperMethods.checkEventProgressBars('app-network-stats-card', /Networking Moments to Go: (\d+) \/ (\d+)/)
  })

  it('Delete "I networked" event. Click Track/Networking. Click "Unnamed Network Lead", click ellipsis on "I networked" card. Click Delete. Click back, click back, click Stats tab. Verify event count (numerator) decreases and progress bar % is correct', () => {
    helperMethods.accessStatsTab()
    progressBarHelperMethods.getProgressNumeratorBefore(/Networking Moments to Go: (\d+) \/ (\d+)/, 'app-network-stats-card')
    helperMethods.handleDeleteEffort("Networking")
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressNumeratorAfter(/Networking Moments to Go: (\d+) \/ (\d+)/, -1, 'app-network-stats-card')
    helperMethods.checkEventProgressBars('app-network-stats-card', /Networking Moments to Go: (\d+) \/ (\d+)/)
  })

  it('Set network start date earlier, verify weeks and event counts (denominators) increase and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="NetworkStatsConfig.networkStartDate"]', true)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("NetworkStatsConfig.networkStartDate", "NetworkStatsConfig.networkEndDate", 'app-network-stats-card', 'weeks', 7)
    helperMethods.checkEventProgressBars('app-network-stats-card', /Networking Moments to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-network-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set ask end date later, verify weeks and event counts (denominators) increase and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="NetworkStatsConfig.networkEndDate"]', false)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("NetworkStatsConfig.networkStartDate", "NetworkStatsConfig.networkEndDate", 'app-network-stats-card', 'weeks', 7)
    helperMethods.checkEventProgressBars('app-network-stats-card', /Networking Moments to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-network-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set ask period start date later, verify weeks and event counts (denominators) decrease and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="NetworkStatsConfig.networkStartDate"]', false)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("NetworkStatsConfig.networkStartDate", "NetworkStatsConfig.networkEndDate", 'app-network-stats-card', 'weeks', 7)
    helperMethods.checkEventProgressBars('app-network-stats-card', /Networking Moments to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-network-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set ask period end date earlier, verify weeks and event counts (denominators) decrease and progress bar % is correct', () => {
    helperMethods.accessHomePage()
    helperMethods.setDates('[id="NetworkStatsConfig.networkEndDate"]', true)
    helperMethods.accessStatsTab()
    helperMethods.compareDates("NetworkStatsConfig.networkStartDate", "NetworkStatsConfig.networkEndDate", 'app-network-stats-card', 'weeks', 7)
    helperMethods.checkEventProgressBars('app-network-stats-card', /Networking Moments to Go: (\d+) \/ (\d+)/)
    helperMethods.checkWeeksProgressBars('app-network-stats-card', /Weeks to Go: (\d+) \/ (\d+)/)
  })

  it('Set pitch target level High, verify event counts is 3x what it was and progress bar % is correct', () => {
    helperMethods.accessStatsTab()
    progressBarHelperMethods.getProgressDenominatorBeforeSettingTargetLevel(/Networking Moments to Go: (\d+) \/ (\d+)/, 'app-network-stats-card', 3)
    helperMethods.accessHomePage()
    helperMethods.handleSetTargetLevel('[id="NetworkStatsConfig.targetNetwork"]')
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkProgressDenominatorAfterSettingTargetLevelHigh(/Networking Moments to Go: (\d+) \/ (\d+)/, 'app-network-stats-card')
    helperMethods.checkEventProgressBars('app-network-stats-card', /Networking Moments to Go: (\d+) \/ (\d+)/)
  })

  it('Verify that info icon displays "Build Your Network Stats Info" chat page and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testInfoIcon('app-network-stats-card', 'Build Your Network Stats Info', 'Build Your Network')
  })

  it('Verify that pencil icon displays "Build Your Network Stats" chat page (no need to test full chat) and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testPencilIcon('app-network-stats-card', 'Build Your Network Stats', 'Build Your Network')
  })

  it('Add all four kinds of pitches, ensure that each cell is highlighted correctly', () => {
    pitchPreppedHelperMethods.addPitch("Elevator")
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.checkPitchPreppedGrid(true, false, false, false)
    pitchPreppedHelperMethods.addPitch("Networking")
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.checkPitchPreppedGrid(true, true, false, false)
    pitchPreppedHelperMethods.addPitch("Goal")
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.checkPitchPreppedGrid(true, true, true, false)
    pitchPreppedHelperMethods.addPitch("Social")
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.checkPitchPreppedGrid(true, true, true, true)
  })

  it('Delete all four kinds of pitches, ensure that each cell is highlighted correctly', () => {
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.deletePitch("Elevator")
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.checkPitchPreppedGrid(false, true, true, true)
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.deletePitch("Networking")
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.checkPitchPreppedGrid(false, false, true, true)
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.deletePitch("Goal")
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.checkPitchPreppedGrid(false, false, false, true)
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.deletePitch("Social")
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.checkPitchPreppedGrid(false, false, false, false)
    helperMethods.accessStatsTab()
  })

  it('Verify that info icon displays "Pitch Prepped Stats Info" chat page and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testInfoIcon('app-pitch-prepped-stats-card', "Pitch Prepped Stats Info", "Pitch Prepped")
  })

  it('Verify that pencil icon displays "Pitch Prepped Stats" chat page (no need to test full chat) and back button returns to stats card', () => {
    helperMethods.accessStatsTab()
    helperMethods.testPencilIcon('app-pitch-prepped-stats-card', "Pitch Prepped Stats", "Pitch Prepped")
  })
})