import {unmarshal} from "../../../../../../src/controllers/images/unmarshal"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the key is correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        external_id: 54570839725,
        image_provider: true,
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
            external_id: 54570839725,
            image_provider: true,
        })
})
