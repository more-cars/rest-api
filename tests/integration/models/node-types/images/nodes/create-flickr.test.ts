import {describe, expect, test} from 'vitest'
import {faker} from "@faker-js/faker"
import {FakeImage} from "../../../../../_toolbox/fixtures/nodes/FakeImage"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {FlickrImageAlreadyExistsError} from "../../../../../../src/models/types/FlickrImageAlreadyExistsError"
import {mockFlickrRequest} from "../../../../../_toolbox/mockFlickrRequest"

describe('Create Image - Flickr', () => {
    test('When providing valid data then the new node is created', async () => {
        mockFlickrRequest()

        const inputData = FakeImage.dbInputMinimal
        inputData.image_provider = 'flickr'

        const createdNode = await Image.create(inputData)

        expect(createdNode.attributes.external_id)
            .toEqual(inputData.external_id)
    })

    test('Trying to add the same image again', async () => {
        mockFlickrRequest()

        const inputData = FakeImage.dbInputMinimal
        inputData.image_provider = 'flickr'
        inputData.external_id = faker.string.uuid() // TODO update FakeImage to return a fresh set of data (instead of cached)

        await Image.create(inputData)

        await expect(Image.create(inputData))
            .rejects
            .toThrow(FlickrImageAlreadyExistsError)
    })
})
