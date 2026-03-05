import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING EVENT can have multiple ›covered-by-magazine-issue‹ relationships', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const magazineIssuesAmount = 3
    const magazineIssues = await seedNodes(DbNodeType.MagazineIssue, magazineIssuesAmount)

    for (const magazineIssue of magazineIssues) {
        await RacingEvent.createCoveredByMagazineIssueRelationship(racingEvent.properties.id, magazineIssue.properties.id)
    }

    const relationships = await getRelationshipCollection(racingEvent.properties.id, RelationshipType.RacingEventCoveredByMagazineIssue)

    expect(relationships.length)
        .toBe(magazineIssuesAmount)
})
