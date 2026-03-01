import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/images/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        external_id: "54570839725",
        image_provider: "flickr",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            external_id: "54570839725",
            image_provider: "flickr",
        })
})
