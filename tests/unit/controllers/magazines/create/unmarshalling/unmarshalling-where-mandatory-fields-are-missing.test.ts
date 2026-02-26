import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/magazines/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {}
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            founded: undefined,
            defunct: undefined,
            focus: undefined,
            publication_frequency: undefined,
            single_copy_price: undefined,
            single_copy_price_unit: undefined,
            publication_format: undefined,
            circulation: undefined,
            circulation_year: undefined,
            publisher: undefined,
            issn: undefined,
        })
})
