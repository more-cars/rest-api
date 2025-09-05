import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

test('Car Model does not exist', async () => {
    vi.spyOn(CarModel, 'hasHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(1234)
        })

    const response = await request(app)
        .get('/car-models/1234/has-prime-image/5678')

    expect(response.statusCode)
        .toBe(404)
})

test('Image does not exist', async () => {
    vi.spyOn(CarModel, 'hasHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(5678)
        })

    const response = await request(app)
        .get('/car-models/1234/has-prime-image/5678')

    expect(response.statusCode)
        .toBe(404)
})

test('Both nodes exists, but have no relationship', async () => {
    vi.spyOn(CarModel, 'hasHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new RelationshipNotFoundError('has prime image', 1234, 5678)
        })

    const response = await request(app)
        .get('/car-models/1234/has-prime-image/5678')

    expect(response.statusCode)
        .toBe(404)
})

test('Nodes and relationship exist', async () => {
    CarModel.hasHasPrimeImageRelationship = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .get('/car-models/1234/has-prime-image/5678')

    expect(response.statusCode)
        .toBe(200)
})
