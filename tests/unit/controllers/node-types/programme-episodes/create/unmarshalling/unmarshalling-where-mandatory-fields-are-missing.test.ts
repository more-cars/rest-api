import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/programme-episodes/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        season_number: 2,
        season_episode_number: 2,
        original_air_date: "2017-12-08",
        duration: "PT55M"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            title: undefined,
            season_number: 2,
            season_episode_number: 2,
            original_air_date: "2017-12-08",
            duration: "PT55M"
        })
})
