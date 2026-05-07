import {describe, expect, test} from 'vitest'
import {CreateModelCarInput} from "../../../../../../src/models/node-types/model-cars/types/CreateModelCarInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateModelCarInput = {
            name: "   BMW 2002  ",
            product_code: "   DHX60  ",
            release_year: 2016,
            scale: "   1:64  ",
            series: "   BMW  ",
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
})
