import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
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
            date: undefined,
        })
})
