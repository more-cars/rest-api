import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/lap-times/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {}
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            time: undefined,
            driver_name: undefined,
            date: undefined,
        })
})
