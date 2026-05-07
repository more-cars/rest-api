import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [false, 2, 2, "2017-12-08", "PT55M"],
    ["The Falls Guys", false, 2, "2017-12-08", "PT55M"],
    ["The Falls Guys", 2, false, "2017-12-08", "PT55M"],
    ["The Falls Guys", 2, 2, false, "PT55M"],
    ["The Falls Guys", 2, 2, "2017-12-08", false],
])('validating a request where the fields have invalid data types', async (
    title,
    season_number,
    season_episode_number,
    original_air_date,
    duration,
) => {
    const data = {
        title,
        season_number,
        season_episode_number,
        original_air_date,
        duration,
    }

    const result = validateInputData(data, NodeType.ProgrammeEpisode)

    expect(result)
        .toBeFalsy()
})
