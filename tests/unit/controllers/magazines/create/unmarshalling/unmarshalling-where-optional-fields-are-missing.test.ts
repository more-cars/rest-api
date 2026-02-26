import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/magazines/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "Top Gear",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Top Gear",
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
