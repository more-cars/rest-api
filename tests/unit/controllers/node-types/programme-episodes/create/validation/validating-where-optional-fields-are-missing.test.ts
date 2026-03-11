import {expect, test} from 'vitest'
import {CreateProgrammeEpisodeRawInput} from "../../../../../../../src/controllers/node-types/programme-episodes/types/CreateProgrammeEpisodeRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/programme-episodes/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateProgrammeEpisodeRawInput = {
        title: "The Falls Guys",
        season_number: undefined,
        season_episode_number: undefined,
        original_air_date: undefined,
        duration: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
