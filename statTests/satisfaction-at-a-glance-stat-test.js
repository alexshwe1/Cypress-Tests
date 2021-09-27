const helperMethods = require('./helperMethods.js');
const satisfactionHelperMethods = require('./satisfactionHelperMethods.js');

/**
 * This .js file contains the cypress scripts to test the satisfaction at a glance stat card.
 */
describe('Satisfaction at a Glance Test', () => {
  it('After clearing user data, verify initial state of stats cards', () => {
    helperMethods.accessHomePage()
    helperMethods.clearUserData()
    helperMethods.accessStatsTab()
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
})