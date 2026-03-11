import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/motor-shows/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "2017 IAA Frankfurt"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "2017 IAA Frankfurt",
            date_from: undefined,
            date_until: undefined,
            location: undefined,
            target_audience: undefined,
            focus: undefined
        })
})
