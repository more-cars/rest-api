import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/lap-times/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the "keys" are correct.
 */
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
