import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const image = await seedNode(DbNodeType.Image)

    await expect(TrackLayout.createHasImageRelationship(trackLayout.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createHasImageRelationship(trackLayout.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
