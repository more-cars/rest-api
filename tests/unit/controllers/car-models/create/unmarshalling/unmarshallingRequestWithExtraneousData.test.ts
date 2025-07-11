import {unmarshal} from "../../../../../../src/controllers/carModels/unmarshal"

/**
 * Requests are NOT rejected when they contain too much information.
 * The extraneous fields are simply ignored.
 */
test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        name: "360 Modena",
        id: 42,
        my_property: "Hello",
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
            name: "360 Modena",
            built_from: undefined,
            built_to: undefined,
            generation: undefined,
            internal_code: undefined,
            total_production: undefined,
        })
})
