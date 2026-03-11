import {expect, test} from 'vitest'
import {CreateProgrammeRawInput} from "../../../../../../../src/controllers/node-types/programmes/types/CreateProgrammeRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/programmes/create"

test('validating a complete and valid request', async () => {
    const data: CreateProgrammeRawInput = {
        name: "Top Gear",
        aired_from_year: 2002,
        aired_until_year: 2022,
        channel: "BBC Two",
        total_seasons: 33,
        total_episodes: 240,
        regular_episode_running_time: 60,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
