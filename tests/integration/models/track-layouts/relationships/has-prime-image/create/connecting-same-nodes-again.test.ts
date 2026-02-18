import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(TrackLayout.createHasPrimeImageRelationship(trackLayout.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(TrackLayout.createHasPrimeImageRelationship(trackLayout.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
