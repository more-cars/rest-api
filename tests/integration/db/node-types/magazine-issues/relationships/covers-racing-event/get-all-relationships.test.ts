import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›covers-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        await seedRelationshipForStartNode(magazineIssue.properties.id, DbNodeType.RacingEvent, RelationshipType.MagazineIssueCoversRacingEvent)
        await seedRelationshipForStartNode(magazineIssue.properties.id, DbNodeType.RacingEvent, RelationshipType.MagazineIssueCoversRacingEvent)

        const relationships = await getRelationshipCollection(
            magazineIssue.properties.id,
            RelationshipType.MagazineIssueCoversRacingEvent,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        const relationships = await getRelationshipCollection(
            magazineIssue.properties.id,
            RelationshipType.MagazineIssueCoversRacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.MagazineIssueCoversRacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
