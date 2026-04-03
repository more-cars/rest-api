import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/programmes/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        aired_from_year: 2002,
        aired_until_year: 2022,
        channel: "BBC Two",
        total_seasons: 33,
        total_episodes: 240,
        regular_episode_running_time: "PT60M"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            aired_from_year: 2002,
            aired_until_year: 2022,
            channel: "BBC Two",
            total_seasons: 33,
            total_episodes: 240,
            regular_episode_running_time: "PT60M"
        })
})
