const helperMethods = require('./helperMethods.js');
const pitchPreppedHelperMethods = require('./pitchPreppedHelperMethods.js');

/**
 * This .js file contains the cypress scripts to test the Pitch Prepped card.
 */
describe('Pitch Prepped Stats card tests', () => {
  it('After clearing user data, verify initial state of stats cards', () => {
    helperMethods.accessHomePage()
    helperMethods.clearUserData()
    helperMethods.accessStatsTab()
    pitchPreppedHelperMethods.checkClearedData()
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