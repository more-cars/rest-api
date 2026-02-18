import {describe, expect, test} from 'vitest'
import {CreateImageInput} from "../../../../../src/models/node-types/images/types/CreateImageInput"
import {sanitize} from "../../../../../src/controllers/node-types/images/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateImageInput = {
            external_id: "    54570839725",
            image_provider: " flickr    ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                external_id: "54570839725",
                image_provider: "flickr",
            })
    })
})
