import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
        date: "1996-08-03",
        my_property: "Hello",
    }

    const result = unmarshalInputData(data, [
        'time',
        'driver_name',
        'date',
    ])

    expect(result)
        .toStrictEqual({
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
            date: "1996-08-03",
        })
})
