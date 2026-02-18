import {expect, test} from 'vitest'
import {CreateGamingPlatformRawInput} from "../../../../../../src/controllers/node-types/gaming-platforms/types/CreateGamingPlatformRawInput"
import {validate} from "../../../../../../src/controllers/node-types/gaming-platforms/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateGamingPlatformRawInput = {
        name: "PlayStation 5",
        release_year: undefined,
        manufacturer: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
