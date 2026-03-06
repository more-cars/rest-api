import {expect, test} from 'vitest'
import {CreateRatingRawInput} from "../../../../../../../src/controllers/node-types/ratings/types/CreateRatingRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/ratings/create"

test.each([
    [false, 0, 100, "up"],
    [93, false, 100, "up"],
    [93, 0, false, "up"],
    [93, 0, 100, false],
])('validating a request where the fields have invalid data types', async (
    rating_value,
    scale_minimum,
    scale_maximum,
    scale_direction,
) => {
    const data: CreateRatingRawInput = {
        rating_value,
        scale_minimum,
        scale_maximum,
        scale_direction,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
