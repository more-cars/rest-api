import {describe, expect, test} from 'vitest'
import {CreateRatingInput} from "../../../../../../src/models/node-types/ratings/types/CreateRatingInput"
import {sanitize} from "../../../../../../src/controllers/node-types/ratings/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateRatingInput = {
            rating_value: 93,
            scale_minimum: 0,
            scale_maximum: 100,
            scale_direction: "   up  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                rating_value: 93,
                scale_minimum: 0,
                scale_maximum: 100,
                scale_direction: "up",
            })
    })
})
