import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/brands/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the key is correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
        founded: "1916",
        defunct: false,
        wmi: [1, 2, 3],
        hsn: 5,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: "1916",
            defunct: false,
            wmi: [1, 2, 3],
            hsn: 5,
        })
})
