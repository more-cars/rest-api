import {describe, expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"

describe('Requesting a ›has-successor‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.CarModel, DbNodeType.CarModel, RelationshipType.CarModelHasSuccessor)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.CarModelHasSuccessor,
            DbNodeType.CarModel,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        const relationships = await getRelationshipCollection(
            carModel.properties.id,
            RelationshipType.CarModelHasSuccessor,
            DbNodeType.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelHasSuccessor,
            DbNodeType.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
