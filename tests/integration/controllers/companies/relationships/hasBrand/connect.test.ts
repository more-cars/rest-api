import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Company} from "../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Creating a ›has-brand‹ relationship with valid data', async () => {
    Company.createHasBrandRelationship = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .post('/companies/123/has-brand/567')

    expect(response.statusCode)
        .toBe(201)
})

test('Trying to create the same ›has-brand‹ relationship again', async () => {
    vi.spyOn(Company, 'createHasBrandRelationship')
        .mockImplementation(async () => {
            throw new RelationshipAlreadyExistsError('has-brand', 123, 567)
        })

    const response = await request(app)
        .post('/companies/123/has-brand/567')

    expect(response.statusCode)
        .toBe(304)
})

test('Trying to create a ›has-brand‹ relationship with nodes that do not exist', async () => {
    vi.spyOn(Company, 'createHasBrandRelationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(123)
        })

    const response = await request(app)
        .post('/companies/123/has-brand/567')

    expect(response.statusCode)
        .toBe(404)
})

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.spyOn(Company, 'createHasBrandRelationship')
        .mockImplementation(async () => {
            throw new Error('Arbitrary error')
        })

    const response = await request(app)
        .post('/companies/123/has-brand/123')

    expect(response.statusCode)
        .toBe(500)
})
