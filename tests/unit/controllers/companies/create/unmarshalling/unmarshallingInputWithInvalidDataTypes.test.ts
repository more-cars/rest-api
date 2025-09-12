import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/companies/unmarshal"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the "keys" are correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        founded: true,
        defunct: true,
        headquarters_location: true,
        legal_headquarters_location: true,
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
            name: true,
            founded: true,
            defunct: true,
            headquarters_location: true,
            legal_headquarters_location: true,
        })
})
