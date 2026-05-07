import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        aired_from_year: true,
        aired_until_year: true,
        channel: true,
        total_seasons: true,
        total_episodes: true,
        regular_episode_running_time: true,
        country_code: true,
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
            name: true,
            aired_from_year: true,
            aired_until_year: true,
            channel: true,
            total_seasons: true,
            total_episodes: true,
            regular_episode_running_time: true,
            country_code: true,
        })
})
