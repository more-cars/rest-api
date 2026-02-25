import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-lap-time‹ relationships', () => {
    test('node and relationships exist', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)
        await seedRelationshipForStartNode(trackLayout.properties.id, DbNodeType.LapTime, RelationshipType.TrackLayoutHasLapTime)
        await seedRelationshipForStartNode(trackLayout.properties.id, DbNodeType.LapTime, RelationshipType.TrackLayoutHasLapTime)

        const relationships = await getRelationshipCollection(
            trackLayout.properties.id,
            RelationshipType.TrackLayoutHasLapTime,
            DbNodeType.LapTime,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        const relationships = await getRelationshipCollection(
            trackLayout.properties.id,
            RelationshipType.TrackLayoutHasLapTime,
            DbNodeType.LapTime,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.TrackLayoutHasLapTime,
            DbNodeType.LapTime,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
