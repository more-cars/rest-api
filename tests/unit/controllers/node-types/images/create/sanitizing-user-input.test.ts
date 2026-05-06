import {describe, expect, test} from 'vitest'
import {CreateImageInput} from "../../../../../../src/models/node-types/images/types/CreateImageInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateImageInput = {
            image_provider: " flickr    ",
            external_id: "    54570839725",
        }

        const result = unmarshalInputData(data, [
            'image_provider',
            'external_id',
        ])

        expect(result)
            .toStrictEqual({
                image_provider: "flickr",
                external_id: "54570839725",
            })
    })
})
