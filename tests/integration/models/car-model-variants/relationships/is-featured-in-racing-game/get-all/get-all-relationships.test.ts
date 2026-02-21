import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›is-featured-in-racing-game‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)
        await seedRelationshipForStartNode(carModelVariant.properties.id, ControllerNodeType.RacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame)
        await seedRelationshipForStartNode(carModelVariant.properties.id, ControllerNodeType.RacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame)

        const relationships = await CarModelVariant.getAllIsFeaturedInRacingGameRelationships(carModelVariant.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)

        const relationships = await CarModelVariant.getAllIsFeaturedInRacingGameRelationships(carModelVariant.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(CarModelVariant.getAllIsFeaturedInRacingGameRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
