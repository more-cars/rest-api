import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/brands/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        full_name: "Bayerische Motoren Werke",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            full_name: "Bayerische Motoren Werke",
            founded: undefined,
            defunct: undefined,
            wmi: undefined,
            hsn: undefined,
        })
})
