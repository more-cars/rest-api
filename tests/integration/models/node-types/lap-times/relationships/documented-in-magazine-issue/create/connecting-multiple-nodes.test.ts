import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A LAP TIME cannot have multiple ›documented-in-magazine-issue‹ relationships', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const magazineIssuesAmount = 3
    const magazineIssues = await seedNodes(DbNodeType.MagazineIssue, magazineIssuesAmount)

    for (const magazineIssue of magazineIssues) {
        await LapTime.createDocumentedInMagazineIssueRelationship(lapTime.properties.id, magazineIssue.properties.id)
    }

    const relationships = await getRelationshipCollection(lapTime.properties.id, RelationshipType.LapTimeDocumentedInMagazineIssue)

    expect(relationships.length)
        .toBe(1)
})
