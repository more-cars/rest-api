import {beforeEach, describe, expect, test, vi} from "vitest"
import request from "supertest"
import * as wm from "../../../../../src/db/external/wikimedia/performWikimediaApiRequest"
import {app} from "../../../../../src/app"
import * as image from "../../../../../src/models/node-types/images/create/imageAlreadyExists"
import {mockWikimediaRequest} from "../../../../_toolbox/mockWikimediaRequest"

beforeEach(() => {
    vi.resetAllMocks()
})

describe('Create Wikimedia image', () => {
    test('when the image does not exist', async () => {
        const spy = vi.spyOn(wm, 'performWikimediaApiRequest')
            .mockImplementation(async () => {
                throw new Error('Wikimedia request failed')
            })

        const response = await request(app)
            .post('/images')
            .send({
                image_provider: 'wikimedia',
                external_id: 'WM123456',
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
                image_provider: 'wikimedia',
                external_id: 'WM123456',
            })

        expect(response.statusCode)
            .toBe(409)

        expect(spy)
            .toHaveBeenCalledTimes(1)
    })

    test('when the image exists and is not in the database yet', async () => {
        mockWikimediaRequest()

        const response = await request(app)
            .post('/images')
            .send({
                image_provider: 'wikimedia',
                external_id: 'WM123456',
            })

        expect(response.statusCode)
            .toBe(201)
    })
})
