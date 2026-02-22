import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›achieved-session-result‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        await seedRelationshipForStartNode(carModelVariant.properties.id, DbNodeType.SessionResult, RelationshipType.CarModelVariantAchievedSessionResult)
        await seedRelationshipForStartNode(carModelVariant.properties.id, DbNodeType.SessionResult, RelationshipType.CarModelVariantAchievedSessionResult)

        const relationships = await getRelationshipCollection(
            carModelVariant.properties.id,
            RelationshipType.CarModelVariantAchievedSessionResult,
            DbNodeType.SessionResult,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const relationships = await getRelationshipCollection(
            carModelVariant.properties.id,
            RelationshipType.CarModelVariantAchievedSessionResult,
            DbNodeType.SessionResult,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelVariantAchievedSessionResult,
            DbNodeType.SessionResult,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
