import {describe, expect, test} from 'vitest'
import {CreateProgrammeInput} from "../../../../../../src/models/node-types/programmes/types/CreateProgrammeInput"
import {sanitize} from "../../../../../../src/controllers/node-types/programmes/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateProgrammeInput = {
            name: "   Top Gear  ",
            aired_from_year: 2002,
            aired_until_year: 2022,
            channel: "   BBC Two  ",
            total_seasons: 33,
            total_episodes: 240,
            regular_episode_running_time: 60,
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "Top Gear",
                aired_from_year: 2002,
                aired_until_year: 2022,
                channel: "BBC Two",
                total_seasons: 33,
                total_episodes: 240,
                regular_episode_running_time: 60,
            })
    })
})
