import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"

describe('Creating a ›has-main-video‹ relationship', () => {
    test('Providing valid data', async () => {
        Brand.createHasMainVideoRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.BrandHasMainVideo))

        const response = await request(app)
            .post('/brands/123/has-main-video/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Brand, 'createHasMainVideoRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/brands/123/has-main-video/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Brand, 'createHasMainVideoRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/brands/123/has-main-video/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(Brand, 'createHasMainVideoRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('has-main-video', 123, 567)
            })

        const response = await request(app)
            .post('/brands/123/has-main-video/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
