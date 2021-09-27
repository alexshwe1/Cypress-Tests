const helperMethods = require('./helperMethods.js');
const marketSavvyHelperMethods = require('./marketSavvyHelperMethods.js');

/**
 * This .js file contains the cypress scripts to test the market savvy stat card.
 */
describe('Market Savvy Stats card tests', () => {
  it('After clearing user data, verify initial state of stats cards', () => {
    helperMethods.accessHomePage()
    helperMethods.clearUserData()
    helperMethods.accessStatsTab()
    marketSavvyHelperMethods.checkClearedData()
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
})