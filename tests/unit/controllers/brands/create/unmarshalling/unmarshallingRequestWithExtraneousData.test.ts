import {unmarshal} from "../../../../../../src/controllers/brands/unmarshal"

/**
 * Requests are NOT rejected when they contain too much information.
 * The extraneous fields are simply ignored.
 */
test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        name: "BMW",
        id: 42,
        my_property: "Hello",
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
            name: "BMW",
            full_name: undefined,
            founded: undefined,
            defunct: undefined,
            wmi: undefined,
            hsn: undefined
        })
})
