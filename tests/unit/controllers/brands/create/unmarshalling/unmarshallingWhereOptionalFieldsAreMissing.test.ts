import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/brands/unmarshal"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
            name: "BMW",
            full_name: "Bayerische Motoren Werke",
            founded: undefined,
            defunct: undefined,
            wmi: undefined,
            hsn: undefined,
        })
})
