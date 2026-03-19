import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-cars/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        product_code: "DHX60",
        release_year: 2016,
        scale: "1:64",
        series: "BMW"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            product_code: "DHX60",
            release_year: 2016,
            scale: "1:64",
            series: "BMW"
        })
})
