import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(TrackLayout.createHasImageRelationship(trackLayout.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createHasImageRelationship(trackLayout.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
