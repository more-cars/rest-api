import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/programmes/marshalling/unmarshalInputData"
import type {CreateProgrammeRawInput} from "../../../../../../../src/controllers/node-types/programmes/types/CreateProgrammeRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateProgrammeRawInput = {
        name: "Top Gear",
        aired_from_year: 2002,
        aired_until_year: 2022,
        channel: "BBC Two",
        total_seasons: 33,
        total_episodes: 240,
        regular_episode_running_time: "PT60M",
        country_code: "GB",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Top Gear",
            aired_from_year: 2002,
            aired_until_year: 2022,
            channel: "BBC Two",
            total_seasons: 33,
            total_episodes: 240,
            regular_episode_running_time: "PT60M",
            country_code: "GB",
        })
})
