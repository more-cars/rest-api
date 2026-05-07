import {describe, expect, test} from 'vitest'
import {CreateProgrammeEpisodeInput} from "../../../../../../src/models/node-types/programme-episodes/types/CreateProgrammeEpisodeInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateProgrammeEpisodeInput = {
            title: "   The Falls Guys  ",
            season_number: 2,
            season_episode_number: 2,
            original_air_date: "   2017-12-08  ",
            duration: "   PT55M  ",
        }

        const result = unmarshalInputData(data, [
            'title',
            'season_number',
            'season_episode_number',
            'original_air_date',
            'duration',
        ])

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
