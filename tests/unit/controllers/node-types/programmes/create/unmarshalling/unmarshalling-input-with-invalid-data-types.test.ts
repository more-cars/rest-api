import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/programmes/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        aired_from_year: true,
        aired_until_year: true,
        channel: true,
        total_seasons: true,
        total_episodes: true,
        regular_episode_running_time: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            aired_from_year: true,
            aired_until_year: true,
            channel: true,
            total_seasons: true,
            total_episodes: true,
            regular_episode_running_time: true,
        })
})
