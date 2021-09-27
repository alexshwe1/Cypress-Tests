const helperMethods = require('./helperMethods.js');
const progressBarHelperMethods = require('./progressBarHelperMethods.js');

/**
 * This .js file contains the cypress scripts to test the review ready stat card.
 */
describe('Review Ready Test', () => {
  it('After clearing user data, verify initial state of stats cards', () => {
    helperMethods.accessHomePage()
    helperMethods.clearUserData()
    helperMethods.accessStatsTab()
    progressBarHelperMethods.checkClearedData('app-review-stats-card', '26', /Accomplishments to Go: (\d+) \/ (\d+)/, /Weeks to Go: (\d+) \/ (\d+)/)
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
})
  
