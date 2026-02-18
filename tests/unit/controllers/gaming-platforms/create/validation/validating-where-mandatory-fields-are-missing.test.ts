import {expect, test} from 'vitest'
import {CreateGamingPlatformRawInput} from "../../../../../../src/controllers/node-types/gaming-platforms/types/CreateGamingPlatformRawInput"
import {validate} from "../../../../../../src/controllers/node-types/gaming-platforms/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateGamingPlatformRawInput = {
        name: undefined,
        release_year: 2020,
        manufacturer: "Sony",
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
