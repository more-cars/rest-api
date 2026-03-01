import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/images/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        external_id: 54570839725,
        image_provider: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            external_id: 54570839725,
            image_provider: true,
        })
})
