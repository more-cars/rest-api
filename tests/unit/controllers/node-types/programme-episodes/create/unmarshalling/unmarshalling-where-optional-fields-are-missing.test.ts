import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/programme-episodes/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        title: "The Falls Guys"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            title: "The Falls Guys",
            season_number: undefined,
            season_episode_number: undefined,
            original_air_date: undefined,
            duration: undefined
        })
})
