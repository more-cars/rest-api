import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/programme-episodes/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        title: true,
        season_number: true,
        season_episode_number: true,
        original_air_date: true,
        duration: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            title: true,
            season_number: true,
            season_episode_number: true,
            original_air_date: true,
            duration: true,
        })
})
