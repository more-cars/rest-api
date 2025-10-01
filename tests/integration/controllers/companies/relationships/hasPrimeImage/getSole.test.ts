import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Company} from "../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

test('Database request failed', async () => {
    vi.spyOn(Company, 'getHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new Error()
        })

    const response = await request(app)
        .get('/companies/1234/has-prime-image')

    expect(response.statusCode)
        .toBe(500)
})

test('Company does not exist', async () => {
    vi.spyOn(Company, 'getHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(1234)
        })

    const response = await request(app)
        .get('/companies/1234/has-prime-image')

    expect(response.statusCode)
        .toBe(404)
})

test('Company exists, but has no relationship', async () => {
    vi.spyOn(Company, 'getHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new RelationshipNotFoundError('has prime image', 1234, null)
        })

    const response = await request(app)
        .get('/companies/1234/has-prime-image')

    expect(response.statusCode)
        .toBe(200)
})

test('Company exists and has relationship', async () => {
    Company.getHasPrimeImageRelationship = vi.fn().mockReturnValue({
        relationship_id: 4,
        relationship_name: 'has-prime-image',
    })

    const response = await request(app)
        .get('/companies/1234/has-prime-image')

    expect(response.statusCode)
        .toBe(200)
})
