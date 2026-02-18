import {expect, test} from 'vitest'
import {CreateGamingPlatformRawInput} from "../../../../../../src/controllers/node-types/gaming-platforms/types/CreateGamingPlatformRawInput"
import {validate} from "../../../../../../src/controllers/node-types/gaming-platforms/create"

test('validating a complete and valid request', async () => {
    const data: CreateGamingPlatformRawInput = {
        name: "PlayStation 5",
        release_year: 2020,
        manufacturer: "Sony",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
