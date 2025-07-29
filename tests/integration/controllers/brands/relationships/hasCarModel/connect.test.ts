import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"

test('One of the nodes does not exist', async () => {
    Brand.createHasCarModelRelationship = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .post('/brands/123/has-car-model/567')

    expect(response.statusCode)
        .toBe(404)
})

test('Both nodes are from the same type', async () => {
    vi.spyOn(Brand, 'createHasCarModelRelationship')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .post('/brands/123/has-car-model/123')

    expect(response.statusCode)
        .toBe(422)
})

test('Both nodes exist and are valid relationship partners', async () => {
    Brand.createHasCarModelRelationship = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .post('/brands/123/has-car-model/567')

    expect(response.statusCode)
        .toBe(201)
})
