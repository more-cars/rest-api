import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {GamingPlatform} from "../../../../../../src/models/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../src/models/types/RelationshipAlreadyExistsError"

describe('Creating a ›features-racing-game‹ relationship', () => {
    test('Providing valid data', async () => {
        GamingPlatform.createFeaturesRacingGameRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: 'features-racing-game',
        })

        const response = await request(app)
            .post('/gaming-platforms/123/features-racing-game/567')

        expect(response.statusCode)
            .toBe(201)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(GamingPlatform, 'createFeaturesRacingGameRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/gaming-platforms/123/features-racing-game/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(GamingPlatform, 'createFeaturesRacingGameRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/gaming-platforms/123/features-racing-game/567')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(GamingPlatform, 'createFeaturesRacingGameRelationship')
            .mockImplementation(async () => {
                throw new RelationshipAlreadyExistsError('features-racing-game', 123, 567)
            })

        const response = await request(app)
            .post('/gaming-platforms/123/features-racing-game/567')

        expect(response.statusCode)
            .toBe(304)
    })
})
