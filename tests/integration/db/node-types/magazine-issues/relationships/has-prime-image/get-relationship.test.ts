import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.MagazineIssue, DbNodeType.Image, RelationshipType.MagazineIssueHasPrimeImage)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.MagazineIssueHasPrimeImage,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        const relationships = await getRelationshipCollection(
            magazineIssue.properties.id,
            RelationshipType.MagazineIssueHasPrimeImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.MagazineIssueHasPrimeImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
