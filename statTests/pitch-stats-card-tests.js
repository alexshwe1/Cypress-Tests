const helperMethods = require('./helperMethods.js');
const progressBarHelperMethods = require('./progressBarHelperMethods.js');

/**
 * This .js file contains the cypress scripts to test the Pitch stat card.
 */
describe('Pitch (Talk Yourself Up) Stats card tests', () => {
  it('After clearing user data, verify initial state of stats cards', () => {
    helperMethods.accessHomePage()
    helperMethods.clearUserData()
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkClearedData('app-pitch-stats-card', '12', /Pitches to Go: (\d+) \/ (\d+)/, /Weeks to Go: (\d+) \/ (\d+)/)
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
})