import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE can have multiple ›has-issue‹ relationships', async () => {
    const magazine = await seedNode(DbNodeType.Magazine)
    const magazineIssuesAmount = 3
    const magazineIssues = await seedNodes(DbNodeType.MagazineIssue, magazineIssuesAmount)

    for (const magazineIssue of magazineIssues) {
        await Magazine.createHasIssueRelationship(magazine.properties.id, magazineIssue.properties.id)
    }

    const relationships = await getRelationshipCollection(magazine.properties.id, RelationshipType.MagazineHasIssue)

    expect(relationships.length)
        .toBe(magazineIssuesAmount)
})
