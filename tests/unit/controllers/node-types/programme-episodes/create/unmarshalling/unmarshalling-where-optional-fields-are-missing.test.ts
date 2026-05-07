import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        title: "The Falls Guys"
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
            season_number: undefined,
            season_episode_number: undefined,
            original_air_date: undefined,
            duration: undefined
        })
})
