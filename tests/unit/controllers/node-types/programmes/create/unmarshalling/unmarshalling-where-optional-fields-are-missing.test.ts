import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "Top Gear"
    }

    const result = unmarshalInputData(data, [
        'name',
        'aired_from_year',
        'aired_until_year',
        'channel',
        'total_seasons',
        'total_episodes',
        'regular_episode_running_time',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: "Top Gear",
            aired_from_year: undefined,
            aired_until_year: undefined,
            channel: undefined,
            total_seasons: undefined,
            total_episodes: undefined,
            regular_episode_running_time: undefined,
            country_code: undefined,
        })
})
