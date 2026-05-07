import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"
import type {CreateProgrammeEpisodeRawInput} from "../../../../../../../src/controllers/node-types/programme-episodes/types/CreateProgrammeEpisodeRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateProgrammeEpisodeRawInput = {
        title: "The Falls Guys",
        season_number: 2,
        season_episode_number: 2,
        original_air_date: "2017-12-08",
        duration: "PT55M",
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
