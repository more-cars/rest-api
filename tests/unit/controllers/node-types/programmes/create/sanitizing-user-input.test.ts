import {describe, expect, test} from 'vitest'
import {CreateProgrammeInput} from "../../../../../../src/models/node-types/programmes/types/CreateProgrammeInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateProgrammeInput = {
            name: "   Top Gear  ",
            aired_from_year: 2002,
            aired_until_year: 2022,
            channel: "   BBC Two  ",
            total_seasons: 33,
            total_episodes: 240,
            regular_episode_running_time: "   PT60M  ",
            country_code: "   GB  ",
        }

        const result = unmarshalInputData(data, [
            'name',
            'aired_from_year',
            'aired_until_year',
            'channel',
            'total_seasons',
            'total_episodes',
            'regular_episode_running_time',
            'country_code',
        ])

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
})
