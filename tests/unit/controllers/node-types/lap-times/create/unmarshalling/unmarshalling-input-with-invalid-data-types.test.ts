import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        time: true,
        driver_name: true,
        date: true,
    }

    const result = unmarshalInputData(data, [
        'time',
        'driver_name',
        'date',
    ])

    expect(result)
        .toStrictEqual({
            time: true,
            driver_name: true,
            date: true,
        })
})
