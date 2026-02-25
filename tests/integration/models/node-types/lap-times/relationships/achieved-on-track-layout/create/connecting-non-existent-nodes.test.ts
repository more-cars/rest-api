import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›achieved-on-track-layout‹ relationship with nodes that do not exist', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const trackLayout = await seedNode(DbNodeType.TrackLayout)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(-42, trackLayout.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(lapTime.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
