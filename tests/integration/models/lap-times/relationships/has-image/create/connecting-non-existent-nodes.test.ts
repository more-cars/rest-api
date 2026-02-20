import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(LapTime.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createHasImageRelationship(lapTime.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
