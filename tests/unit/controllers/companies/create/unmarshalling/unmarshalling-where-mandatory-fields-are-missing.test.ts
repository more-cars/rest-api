import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/companies/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {}
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            founded: undefined,
            defunct: undefined,
            headquarters_location: undefined,
            legal_headquarters_location: undefined,
        })
})
