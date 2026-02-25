import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-lap-time‹ relationship', () => {
    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        await expect(TrackLayout.deleteHasLapTimeRelationship(trackLayout.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(TrackLayout.deleteHasLapTimeRelationship(-42, lapTime.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node and LAP TIME node do not exist', async () => {
        await expect(TrackLayout.deleteHasLapTimeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-lap-time‹ relationship', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(TrackLayout.deleteHasLapTimeRelationship(trackLayout.properties.id, lapTime.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-lap-time‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.TrackLayout, DbNodeType.LapTime, RelationshipType.TrackLayoutHasLapTime)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutHasLapTime,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await TrackLayout.deleteHasLapTimeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutHasLapTime,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
