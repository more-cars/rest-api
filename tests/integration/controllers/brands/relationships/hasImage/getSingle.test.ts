import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"

test('Brand and/or Image does not exist', async () => {
    vi.spyOn(Brand, 'getRelationshipForHasImage')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .get('/brands/123/has-image/456')

    expect(response.statusCode)
        .toBe(404)
})

test('Brand exists and has relationship partner', async () => {
    Brand.getRelationshipForHasImage = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .get('/brands/123/has-image/456')

    expect(response.statusCode)
        .toBe(200)
})

test('Brand exists, but has no relationship partner', async () => {
    Brand.getRelationshipForHasImage = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/brands/123/has-image/456')

    expect(response.statusCode)
        .toBe(404)
})
