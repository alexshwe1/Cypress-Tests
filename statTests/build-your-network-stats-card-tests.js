const helperMethods = require('./helperMethods.js');
const progressBarHelperMethods = require('./progressBarHelperMethods.js');

/**
 * This .js file contains the cypress scripts to test the build your network stat card.
 */
describe('Build your network stats card tests', () => {
  it('After clearing user data, verify initial state of stats cards', () => {
    helperMethods.accessHomePage()
    helperMethods.clearUserData()
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkClearedData('app-network-stats-card', '12', /Networking Moments to Go: (\d+) \/ (\d+)/, /Weeks to Go: (\d+) \/ (\d+)/)
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
})