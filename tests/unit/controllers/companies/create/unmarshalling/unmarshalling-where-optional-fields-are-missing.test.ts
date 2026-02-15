import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/companies/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "BMW AG"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "BMW AG",
            founded: undefined,
            defunct: undefined,
            headquarters_location: undefined,
            legal_headquarters_location: undefined,
        })
})
