import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../src/models/types/RelationshipNotFoundError"

test('Car Model does not exist', async () => {
    vi.spyOn(CarModel, 'getHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(1234)
        })

    const response = await request(app)
        .get('/car-models/1234/has-prime-image')

    expect(response.statusCode)
        .toBe(404)
})

test('Car Model exists, but has no relationship', async () => {
    vi.spyOn(CarModel, 'getHasPrimeImageRelationship')
        .mockImplementation(async () => {
            throw new RelationshipNotFoundError('has prime image', 1234, null)
        })

    const response = await request(app)
        .get('/car-models/1234/has-prime-image')

    expect(response.statusCode)
        .toBe(200)
})

test('Car Model exists and has relationship', async () => {
    CarModel.getHasPrimeImageRelationship = vi.fn().mockReturnValue({
        relationship_id: 4,
        relationship_name: 'has-prime-image',
    })

    const response = await request(app)
        .get('/car-models/1234/has-prime-image')

    expect(response.statusCode)
        .toBe(200)
})
