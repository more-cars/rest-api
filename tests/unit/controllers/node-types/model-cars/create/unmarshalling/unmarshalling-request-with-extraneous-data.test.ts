import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "BMW 2002",
        product_code: "DHX60",
        release_year: 2016,
        scale: "1:64",
        series: "BMW",
        my_property: "Hello",
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
            name: "BMW 2002",
            product_code: "DHX60",
            release_year: 2016,
            scale: "1:64",
            series: "BMW",
        })
})
