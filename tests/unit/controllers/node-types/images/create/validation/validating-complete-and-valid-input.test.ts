import {describe, expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

describe('Validating a complete and valid request', () => {
    test('Flickr', async () => {
        const data = {
            image_provider: 'flickr',
            external_id: 'FL123456',
        }

        const result = validateInputData(data, NodeType.Image, ['image_provider', 'external_id'])

        expect(result)
            .toBeTruthy()
    })

    test('Wikimedia', async () => {
        const data = {
            image_provider: "wikimedia",
            external_id: "2011-03-04 Autosalon Genf 1391.JPG"
        }

        const result = validateInputData(data, NodeType.Image, ['image_provider', 'external_id'])

        expect(result)
            .toBeTruthy()
    })
})
