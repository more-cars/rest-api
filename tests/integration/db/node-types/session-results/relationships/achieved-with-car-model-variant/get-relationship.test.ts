import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting a ›achieved-with-car-model-variant‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.SessionResult, DbNodeType.CarModelVariant, RelationshipType.SessionResultAchievedWithCarModelVariant)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
            DbNodeType.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const sessionResult = await seedNode(DbNodeType.SessionResult)

        const relationships = await getRelationshipCollection(
            sessionResult.properties.id,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
            DbNodeType.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.SessionResultAchievedWithCarModelVariant,
            DbNodeType.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
