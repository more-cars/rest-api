import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/magazines/marshalling/unmarshalInputData"

/**
 * Requests are NOT rejected when they contain too much information.
 * The extraneous fields are simply ignored.
 */
test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        name: "Top Gear",
        founded: 1993,
        defunct: null,
        focus: "sports cars",
        publication_frequency: "monthly",
        single_copy_price: 5.99,
        single_copy_price_unit: "£",
        publication_format: "print",
        circulation: 150884,
        circulation_year: 2013,
        publisher: "Immediate Media Company",
        issn: "1350-9624",
        my_property: "Hello",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Top Gear",
            founded: 1993,
            defunct: null,
            focus: "sports cars",
            publication_frequency: "monthly",
            single_copy_price: 5.99,
            single_copy_price_unit: "£",
            publication_format: "print",
            circulation: 150884,
            circulation_year: 2013,
            publisher: "Immediate Media Company",
            issn: "1350-9624",
        })
})
