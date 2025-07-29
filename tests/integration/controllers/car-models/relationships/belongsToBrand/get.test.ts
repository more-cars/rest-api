import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"

test('Node does not exist', async () => {
    vi.spyOn(CarModel, 'getRelationshipForBelongsToBrand')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .get('/car-models/567/belongs-to-brand')

    expect(response.statusCode)
        .toBe(404)
})

test('Node exists and has a relationship partner', async () => {
    CarModel.getRelationshipForBelongsToBrand = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .get('/car-models/567/belongs-to-brand')

    expect(response.statusCode)
        .toBe(200)
})
