import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/motor-shows/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        date_from: true,
        date_until: true,
        location: true,
        target_audience: true,
        focus: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            date_from: true,
            date_until: true,
            location: true,
            target_audience: true,
            focus: true,
        })
})
