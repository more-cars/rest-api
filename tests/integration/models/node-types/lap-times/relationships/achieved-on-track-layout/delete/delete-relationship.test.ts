import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›achieved-on-track-layout‹ relationship', () => {
    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(lapTime.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(-42, trackLayout.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node and TRACK LAYOUT node do not exist', async () => {
        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›achieved-on-track-layout‹ relationship', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(lapTime.properties.id, trackLayout.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›achieved-on-track-layout‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.LapTime, DbNodeType.TrackLayout, RelationshipType.LapTimeAchievedOnTrackLayout)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeAchievedOnTrackLayout,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await LapTime.deleteAchievedOnTrackLayoutRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeAchievedOnTrackLayout,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
