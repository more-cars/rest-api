import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        title: true,
        season_number: true,
        season_episode_number: true,
        original_air_date: true,
        duration: true,
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
            title: true,
            season_number: true,
            season_episode_number: true,
            original_air_date: true,
            duration: true,
        })
})
