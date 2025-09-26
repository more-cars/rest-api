import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Creating a ›has-car-model‹ relationship with valid data', async () => {
    Brand.createHasCarModelRelationship = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .post('/brands/123/has-car-model/567')

    expect(response.statusCode)
        .toBe(201)
})

test('Trying to create the same ›has-car-model‹ relationship again', async () => {
    vi.spyOn(Brand, 'createHasCarModelRelationship')
        .mockImplementation(async () => {
            throw new RelationshipAlreadyExistsError('has-car-model', 123, 567)
        })

    const response = await request(app)
        .post('/brands/123/has-car-model/567')

    expect(response.statusCode)
        .toBe(304)
})

test('Trying to create a ›has-car-model‹ relationship with nodes that do not exist', async () => {
    vi.spyOn(Brand, 'createHasCarModelRelationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(123)
        })

    const response = await request(app)
        .post('/brands/123/has-car-model/567')

    expect(response.statusCode)
        .toBe(404)
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.spyOn(Brand, 'createHasCarModelRelationship')
        .mockImplementation(async () => {
            throw new Error('Arbitrary error')
        })

    const response = await request(app)
        .post('/brands/123/has-car-model/567')

    expect(response.statusCode)
        .toBe(500)
})
