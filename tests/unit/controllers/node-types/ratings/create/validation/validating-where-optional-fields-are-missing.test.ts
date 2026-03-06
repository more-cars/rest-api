import {expect, test} from 'vitest'
import {CreateRatingRawInput} from "../../../../../../../src/controllers/node-types/ratings/types/CreateRatingRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/ratings/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateRatingRawInput = {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: "up",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
