import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        await seedRelationshipForStartNode(racingEvent.properties.id, DbNodeType.Image, RelationshipType.RacingEventHasImage)
        await seedRelationshipForStartNode(racingEvent.properties.id, DbNodeType.Image, RelationshipType.RacingEventHasImage)

        const relationships = await getRelationshipCollection(
            racingEvent.properties.id,
            RelationshipType.RacingEventHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const relationships = await getRelationshipCollection(
            racingEvent.properties.id,
            RelationshipType.RacingEventHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingEventHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
