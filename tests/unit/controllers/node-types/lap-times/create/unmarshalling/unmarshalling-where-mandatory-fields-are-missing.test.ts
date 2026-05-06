import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        date: "1996-08-03",
    }

    const result = unmarshalInputData(data, [
        'time',
        'driver_name',
        'date',
    ])

    expect(result)
        .toStrictEqual({
            time: undefined,
            driver_name: undefined,
            date: "1996-08-03",
        })
})
