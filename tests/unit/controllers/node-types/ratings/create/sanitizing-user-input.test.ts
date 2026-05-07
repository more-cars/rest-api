import {describe, expect, test} from 'vitest'
import {CreateRatingInput} from "../../../../../../src/models/node-types/ratings/types/CreateRatingInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateRatingInput = {
            rating_value: 93,
            scale_minimum: 0,
            scale_maximum: 100,
            scale_direction: "   up  ",
        }

        const result = unmarshalInputData(data, [
            'rating_value',
            'scale_minimum',
            'scale_maximum',
            'scale_direction',
        ])

        expect(result)
            .toStrictEqual({
                rating_value: 93,
                scale_minimum: 0,
                scale_maximum: 100,
                scale_direction: "up",
            })
    })
})
