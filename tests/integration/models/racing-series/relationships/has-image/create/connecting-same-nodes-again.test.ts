import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const racingSeries = await seedNode(ControllerNodeType.RacingSeries)
    const image = await seedNode(ControllerNodeType.Image)

    await expect(RacingSeries.createHasImageRelationship(racingSeries.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSeries.createHasImageRelationship(racingSeries.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
