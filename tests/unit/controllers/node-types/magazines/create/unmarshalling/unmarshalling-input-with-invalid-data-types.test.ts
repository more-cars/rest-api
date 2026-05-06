import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        founded: true,
        defunct: true,
        focus: true,
        publication_frequency: true,
        single_copy_price: true,
        single_copy_price_unit: true,
        publication_format: true,
        circulation: true,
        circulation_year: true,
        publisher: true,
        issn: true,
        country_code: true,
    }

    const result = unmarshalInputData(data, [
        'name',
        'founded',
        'defunct',
        'focus',
        'publication_frequency',
        'single_copy_price',
        'single_copy_price_unit',
        'publication_format',
        'circulation',
        'circulation_year',
        'publisher',
        'issn',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: true,
            founded: true,
            defunct: true,
            focus: true,
            publication_frequency: true,
            single_copy_price: true,
            single_copy_price_unit: true,
            publication_format: true,
            circulation: true,
            circulation_year: true,
            publisher: true,
            issn: true,
            country_code: true,
        })
})
