import {expect, test} from 'vitest'
import {CreateRatingRawInput} from "../../../../../../../src/controllers/node-types/ratings/types/CreateRatingRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/ratings/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateRatingRawInput = {
        rating_value: undefined,
        scale_minimum: undefined,
        scale_maximum: undefined,
        scale_direction: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
