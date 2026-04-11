import {beforeEach, describe, expect, test, vi} from "vitest"
import request from "supertest"
import * as fl from "../../../../../src/db/external/flickr/performFlickrApiRequest"
import {app} from "../../../../../src/app"
import * as image from "../../../../../src/models/node-types/images/create/imageAlreadyExists"
import {mockFlickrRequest} from "../../../../_toolbox/mockFlickrRequest"

beforeEach(() => {
    vi.resetAllMocks()
})

describe('Get Flickr image by ID', () => {
    test('when the image does not exist', async () => {
        const spy = vi.spyOn(fl, 'performFlickrApiRequest')
            .mockImplementation(async () => {
                throw new Error('Flickr request failed')
            })

        const response = await request(app)
            .post('/images')
            .send({
                image_provider: 'flickr',
                external_id: 'FL123456',
            })

        expect(response.statusCode)
            .toBe(422)

        expect(spy)
            .toHaveBeenCalledTimes(1)
    })

    test('when the image is already in the database', async () => {
        const spy = vi.spyOn(image, 'imageAlreadyExists')
            .mockImplementation(async () => true)

        const response = await request(app)
            .post('/images')
            .send({
                image_provider: 'flickr',
                external_id: 'FL123456',
            })

        expect(response.statusCode)
            .toBe(409)

        expect(spy)
            .toHaveBeenCalledTimes(1)
    })

    test('when the image exists and is not in the database yet', async () => {
        mockFlickrRequest()

        const response = await request(app)
            .post('/images')
            .send({
                image_provider: 'flickr',
                external_id: 'FL123456',
            })

        expect(response.statusCode)
            .toBe(201)
    })
})
