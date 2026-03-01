import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/magazines/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
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
    }
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
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
