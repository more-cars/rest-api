import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "Top Gear",
        aired_from_year: undefined,
        aired_until_year: undefined,
        channel: undefined,
        total_seasons: undefined,
        total_episodes: undefined,
        regular_episode_running_time: undefined,
        country_code: undefined,
    }

    const result = validateInputData(data, NodeType.Programme)

    expect(result)
        .toBeTruthy()
})
