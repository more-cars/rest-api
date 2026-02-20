import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

describe('Requesting all ›is-featured-in-racing-game‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
        await seedRelationshipForStartNode(carModelVariant.id, ControllerNodeType.RACING_GAME, RelationshipType.CarModelVariantIsFeaturedInRacingGame)
        await seedRelationshipForStartNode(carModelVariant.id, ControllerNodeType.RACING_GAME, RelationshipType.CarModelVariantIsFeaturedInRacingGame)

        const relationships = await getRelationshipCollection(
            carModelVariant.id,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
            Neo4jNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        const relationships = await getRelationshipCollection(
            carModelVariant.id,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
            Neo4jNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
            Neo4jNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
