import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-lap-time‹ relationship again', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TrackLayout)
    const lapTime = await seedNode(ControllerNodeType.LapTime)

    await expect(TrackLayout.createHasLapTimeRelationship(trackLayout.properties.id, lapTime.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createHasLapTimeRelationship(trackLayout.properties.id, lapTime.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
