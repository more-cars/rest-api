import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/programmes/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "Top Gear"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Top Gear",
            aired_from_year: undefined,
            aired_until_year: undefined,
            channel: undefined,
            total_seasons: undefined,
            total_episodes: undefined,
            regular_episode_running_time: undefined
        })
})
