import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›is-featured-in-racing-game‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        await seedRelationshipForStartNode(carModelVariant.properties.id, DbNodeType.RacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame)
        await seedRelationshipForStartNode(carModelVariant.properties.id, DbNodeType.RacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame)

        const relationships = await getRelationshipCollection(
            carModelVariant.properties.id,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
            DbNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const relationships = await getRelationshipCollection(
            carModelVariant.properties.id,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
            DbNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelVariantIsFeaturedInRacingGame,
            DbNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
