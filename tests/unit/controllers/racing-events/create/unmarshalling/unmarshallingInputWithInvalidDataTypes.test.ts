import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/racing-events/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the "keys" are correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        round: true,
        date_from: true,
        date_to: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            round: true,
            date_from: true,
            date_to: true,
        })
})
