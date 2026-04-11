import {beforeEach, describe, expect, test, vi} from "vitest"
import request from "supertest"
import * as wm from "../../../../../src/db/external/wikimedia/performWikimediaApiRequest"
import {app} from "../../../../../src/app"
import * as image from "../../../../../src/models/node-types/images/create/imageAlreadyExists"
import {FakeGetWikimediaImageByIdResponse} from "../../../../_toolbox/fixtures/external/wikimedia/FakeGetWikimediaImageByIdResponse"

beforeEach(() => {
    vi.resetAllMocks()
})

describe('Get Wikimedia image by ID', () => {
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
        const spy = vi.spyOn(wm, 'performWikimediaApiRequest')
            .mockImplementation(async () => FakeGetWikimediaImageByIdResponse)

        const response = await request(app)
            .post('/images')
            .send({
                image_provider: 'wikimedia',
                external_id: 'WM123456',
            })

        expect(response.statusCode)
            .toBe(201)

        expect(spy)
            .toHaveBeenCalledTimes(1)
    })
})
