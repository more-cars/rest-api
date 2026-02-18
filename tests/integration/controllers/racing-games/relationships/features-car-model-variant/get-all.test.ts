import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {RacingGame} from "../../../../../../src/models/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipType} from "../../../../../../src/models/relationships/types/RelationshipType"

describe('Requesting all ›features-car-model-variant‹ relationships', () => {
    test('Providing valid data', async () => {
        RacingGame.getAllFeaturesCarModelVariantRelationships = vi.fn().mockReturnValue([
            {
                id: 4,
                type: RelationshipType.RacingGameFeaturesCarModelVariant,
            }, {
                id: 5,
                type: RelationshipType.RacingGameFeaturesCarModelVariant,
            }, {
                id: 6,
                type: RelationshipType.RacingGameFeaturesCarModelVariant,
            }
        ])

        const response = await request(app)
            .get('/racing-games/123/features-car-model-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        RacingGame.getAllFeaturesCarModelVariantRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/racing-games/123/features-car-model-variant')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(RacingGame, 'getAllFeaturesCarModelVariantRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/racing-games/123/features-car-model-variant')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(RacingGame, 'getAllFeaturesCarModelVariantRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/racing-games/123/features-car-model-variant')

        expect(response.statusCode)
            .toBe(404)
    })
})
