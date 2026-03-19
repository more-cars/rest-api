import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-cars/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        name: "BMW 2002",
        product_code: "DHX60",
        release_year: 2016,
        scale: "1:64",
        series: "BMW",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "BMW 2002",
            product_code: "DHX60",
            release_year: 2016,
            scale: "1:64",
            series: "BMW",
        })
})
