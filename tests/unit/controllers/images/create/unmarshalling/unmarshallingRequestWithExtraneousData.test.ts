import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/images/unmarshal"

/**
 * Requests are NOT rejected when they contain too much information.
 * The extraneous fields are simply ignored.
 */
test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        external_id: "54570839725",
        id: 42,
        my_property: "Hello",
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
            external_id: "54570839725",
            image_provider: undefined,
        })
})
