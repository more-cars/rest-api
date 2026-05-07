import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        title: "The Falls Guys",
        season_number: 2,
        season_episode_number: 2,
        original_air_date: "2017-12-08",
        duration: "PT55M",
        my_property: "Hello",
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
