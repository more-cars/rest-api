import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/gaming-platforms/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "PlayStation 5",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "PlayStation 5",
            release_year: undefined,
            manufacturer: undefined,
        })
})
