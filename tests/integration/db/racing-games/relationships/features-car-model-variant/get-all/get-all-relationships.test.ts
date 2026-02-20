import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

describe('Requesting all ›features-car-model-variant‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
        await seedRelationshipForStartNode(racingGame.id, ControllerNodeType.CAR_MODEL_VARIANT, RelationshipType.RacingGameFeaturesCarModelVariant)
        await seedRelationshipForStartNode(racingGame.id, ControllerNodeType.CAR_MODEL_VARIANT, RelationshipType.RacingGameFeaturesCarModelVariant)

        const relationships = await getRelationshipCollection(
            racingGame.id,
            RelationshipType.RacingGameFeaturesCarModelVariant,
            Neo4jNodeType.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

        const relationships = await getRelationshipCollection(
            racingGame.id,
            RelationshipType.RacingGameFeaturesCarModelVariant,
            Neo4jNodeType.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingGameFeaturesCarModelVariant,
            Neo4jNodeType.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
