import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-cars/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        product_code: true,
        release_year: true,
        scale: true,
        series: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            product_code: true,
            release_year: true,
            scale: true,
            series: true,
        })
})
