import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/lap-times/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        time: true,
        driver_name: true,
        date: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            time: true,
            driver_name: true,
            date: true,
        })
})
