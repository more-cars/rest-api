import {describe, expect, test} from 'vitest'
import {FakeImage} from "../../../../../_toolbox/fixtures/nodes/FakeImage"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {FlickrImageAlreadyExistsError} from "../../../../../../src/models/types/FlickrImageAlreadyExistsError"
import {mockFlickrRequest} from "../../../../../_toolbox/mockFlickrRequest"

describe('Create Image - Flickr', () => {
    test('When providing valid data then the new node is created', async () => {
        mockFlickrRequest()

        const inputData = FakeImage.dbInputMinimal()
        inputData.image_provider = 'flickr'

        const createdNode = await Image.create(inputData)

        expect(createdNode.attributes.external_id)
            .toEqual(inputData.external_id)
    })

    test('Trying to add the same image again', async () => {
        mockFlickrRequest()

        const inputData = FakeImage.dbInputMinimal()
        inputData.image_provider = 'flickr'

        await Image.create(inputData)

        await expect(Image.create(inputData))
            .rejects
            .toThrow(FlickrImageAlreadyExistsError)
    })
})
