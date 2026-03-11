import {expect, test} from 'vitest'
import {CreateProgrammeRawInput} from "../../../../../../../src/controllers/node-types/programmes/types/CreateProgrammeRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/programmes/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateProgrammeRawInput = {
        name: "Top Gear",
        aired_from_year: undefined,
        aired_until_year: undefined,
        channel: undefined,
        total_seasons: undefined,
        total_episodes: undefined,
        regular_episode_running_time: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
