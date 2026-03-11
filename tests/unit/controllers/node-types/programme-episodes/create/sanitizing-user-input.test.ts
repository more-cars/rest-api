import {describe, expect, test} from 'vitest'
import {CreateProgrammeEpisodeInput} from "../../../../../../src/models/node-types/programme-episodes/types/CreateProgrammeEpisodeInput"
import {sanitize} from "../../../../../../src/controllers/node-types/programme-episodes/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateProgrammeEpisodeInput = {
            title: "   The Falls Guys  ",
            season_number: 2,
            season_episode_number: 2,
            original_air_date: "   2017-12-08  ",
            duration: "   PT55M  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                title: "The Falls Guys",
                season_number: 2,
                season_episode_number: 2,
                original_air_date: "2017-12-08",
                duration: "PT55M",
            })
    })
})
