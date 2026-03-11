import {expect, test} from 'vitest'
import {CreateProgrammeEpisodeRawInput} from "../../../../../../../src/controllers/node-types/programme-episodes/types/CreateProgrammeEpisodeRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/programme-episodes/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateProgrammeEpisodeRawInput = {
        title: undefined,
        season_number: 2,
        season_episode_number: 2,
        original_air_date: "2017-12-08",
        duration: "PT55M",
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
