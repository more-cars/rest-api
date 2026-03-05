import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›covered-by-magazine-issue‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        await seedRelationshipForStartNode(racingEvent.properties.id, DbNodeType.MagazineIssue, RelationshipType.RacingEventCoveredByMagazineIssue)
        await seedRelationshipForStartNode(racingEvent.properties.id, DbNodeType.MagazineIssue, RelationshipType.RacingEventCoveredByMagazineIssue)

        const relationships = await getRelationshipCollection(
            racingEvent.properties.id,
            RelationshipType.RacingEventCoveredByMagazineIssue,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const relationships = await getRelationshipCollection(
            racingEvent.properties.id,
            RelationshipType.RacingEventCoveredByMagazineIssue,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingEventCoveredByMagazineIssue,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
