import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"
import {SemanticError} from "../../../../../../src/models/types/SemanticError"

describe('Creating a ›is-successor-of‹ relationship', () => {
    test('Providing valid data', async () => {
        CarModel.createIsSuccessorOfRelationship = vi.fn().mockReturnValue({
            relationship_id: 4,
            relationship_name: 'is-successor-of',
        })

        const response = await request(app)
            .post('/car-models/123/is-successor-of/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(CarModel, 'createIsSuccessorOfRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/car-models/123/is-successor-of/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(CarModel, 'createIsSuccessorOfRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/car-models/123/is-successor-of/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(CarModel, 'createIsSuccessorOfRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('is-successor-of', 123, 567)
            })

        const response = await request(app)
            .post('/car-models/123/is-successor-of/567')

        expect(response.statusCode)
            .toBe(304)
    })

    test('Trying to connect the CAR MODEL to itself', async () => {
        vi.spyOn(CarModel, 'createIsSuccessorOfRelationship')
            .mockImplementation(async () => {
                throw new SemanticError('A Car Model cannot be connected to itself')
            })

        const response = await request(app)
            .post('/car-models/123/is-successor-of/123')

        expect(response.statusCode)
            .toBe(422)
    })
})
