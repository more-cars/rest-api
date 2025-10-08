import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/images/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        external_id: "54570839725",
        description: "Engine: 3.3L B6",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            external_id: "54570839725",
            image_provider: undefined,
        })
})
