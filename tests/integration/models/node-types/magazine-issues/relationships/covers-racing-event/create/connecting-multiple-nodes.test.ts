import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE ISSUE can have multiple ›covers-racing-event‹ relationships', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(DbNodeType.RacingEvent, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await MagazineIssue.createCoversRacingEventRelationship(magazineIssue.properties.id, racingEvent.properties.id)
    }

    const relationships = await getRelationshipCollection(magazineIssue.properties.id, RelationshipType.MagazineIssueCoversRacingEvent)

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
