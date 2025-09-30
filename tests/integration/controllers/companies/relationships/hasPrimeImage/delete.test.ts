import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Company} from "../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

test('Company does not exist', async () => {
    vi.spyOn(Company, 'deleteHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(1234)
        })

    const response = await request(app)
        .delete('/companies/1234/has-prime-image/5678')

    expect(response.statusCode)
        .toBe(404)
})

test('Company exists, but has no relationship', async () => {
    vi.spyOn(Company, 'deleteHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new RelationshipNotFoundError('has prime image', 1234, null)
        })

    const response = await request(app)
        .delete('/companies/1234/has-prime-image/5678')

    expect(response.statusCode)
        .toBe(404)
})

test('Company exists and has relationship', async () => {
    Company.deleteHasPrimeImageRelationship = vi.fn().mockReturnValue(null)

    const response = await request(app)
        .delete('/companies/1234/has-prime-image/5678')

    expect(response.statusCode)
        .toBe(204)
})
