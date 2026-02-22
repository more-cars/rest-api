import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›achieved-on-track-layout‹ relationship again', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const trackLayout = await seedNode(DbNodeType.TrackLayout)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(lapTime.properties.id, trackLayout.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(lapTime.properties.id, trackLayout.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
