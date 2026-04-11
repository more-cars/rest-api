import {describe, expect, test} from 'vitest'
import {CreateImageRawInput} from "../../../../../../../src/controllers/node-types/images/types/CreateImageRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/images/create"

describe('Validating a complete and valid request', () => {
    test('Flickr', async () => {
        const data: CreateImageRawInput = {
            image_provider: 'flickr',
            external_id: 'FL123456',
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('Wikimedia', async () => {
        const data: CreateImageRawInput = {
            image_provider: "wikimedia",
            external_id: "2011-03-04 Autosalon Genf 1391.JPG"
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
