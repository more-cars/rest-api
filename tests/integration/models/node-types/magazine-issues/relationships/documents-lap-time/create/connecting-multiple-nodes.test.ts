import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE ISSUE can have multiple ›documents-lap-time‹ relationships', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(DbNodeType.LapTime, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await MagazineIssue.createDocumentsLapTimeRelationship(magazineIssue.properties.id, lapTime.properties.id)
    }

    const relationships = await getRelationshipCollection(magazineIssue.properties.id, RelationshipType.MagazineIssueDocumentsLapTime)

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
