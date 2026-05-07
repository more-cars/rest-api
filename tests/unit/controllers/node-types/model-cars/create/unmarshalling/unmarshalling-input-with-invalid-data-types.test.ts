import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        product_code: true,
        release_year: true,
        scale: true,
        series: true,
    }

    const result = unmarshalInputData(data, [
        'name',
        'product_code',
        'release_year',
        'scale',
        'series',
    ])

    expect(result)
        .toStrictEqual({
            name: true,
            product_code: true,
            release_year: true,
            scale: true,
            series: true,
        })
})
