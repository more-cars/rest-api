import {describe, expect, test} from 'vitest'
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-issue‹ relationships', () => {
    test('node and relationships exist', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)
        await seedRelationshipForStartNode(magazine.properties.id, DbNodeType.MagazineIssue, RelationshipType.MagazineHasIssue)
        await seedRelationshipForStartNode(magazine.properties.id, DbNodeType.MagazineIssue, RelationshipType.MagazineHasIssue)

        const relationships = await Magazine.getAllHasIssueRelationships(magazine.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)

        const relationships = await Magazine.getAllHasIssueRelationships(magazine.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Magazine.getAllHasIssueRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
