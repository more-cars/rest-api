import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('Requesting a ›belongs-to-magazine‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.MagazineIssue, DbNodeType.Magazine, RelationshipType.MagazineIssueBelongsToMagazine)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.MagazineIssueBelongsToMagazine,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        const relationships = await getRelationshipCollection(
            magazineIssue.properties.id,
            RelationshipType.MagazineIssueBelongsToMagazine,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.MagazineIssueBelongsToMagazine,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
