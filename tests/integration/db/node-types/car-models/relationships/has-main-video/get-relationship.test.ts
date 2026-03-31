import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('Requesting a ›has-main-video‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.CarModel, DbNodeType.Video, RelationshipType.CarModelHasMainVideo)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.CarModelHasMainVideo,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        const relationships = await getRelationshipCollection(
            carModel.properties.id,
            RelationshipType.CarModelHasMainVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelHasMainVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
