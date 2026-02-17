import {expect, test} from 'vitest'
import {CreateGamingPlatformRawInput} from "../../../../../../src/controllers/gaming-platforms/types/CreateGamingPlatformRawInput"
import {validate} from "../../../../../../src/controllers/gaming-platforms/create"

test.each([
    [true, 2020, "Sony"],
    ["PlayStation 5", false, "Sony"],
    ["PlayStation 5", 2020, false],
])('validating a request where the fields have invalid data types', async (
    name, release_year, manufacturer
) => {
    const data: CreateGamingPlatformRawInput = {
        name,
        release_year,
        manufacturer,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
