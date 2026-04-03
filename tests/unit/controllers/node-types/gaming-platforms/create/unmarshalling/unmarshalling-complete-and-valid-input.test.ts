import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/gaming-platforms/marshalling/unmarshalInputData"
import type {CreateGamingPlatformRawInput} from "../../../../../../../src/controllers/node-types/gaming-platforms/types/CreateGamingPlatformRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateGamingPlatformRawInput = {
        name: "PlayStation 5",
        release_year: 2020,
        manufacturer: "Sony",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "PlayStation 5",
            release_year: 2020,
            manufacturer: "Sony",
        })
})
