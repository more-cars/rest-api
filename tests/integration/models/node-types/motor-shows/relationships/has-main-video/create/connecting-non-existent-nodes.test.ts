import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-main-video‹ relationship with nodes that do not exist', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const video = await seedNode(DbNodeType.Video)

    await expect(MotorShow.createHasMainVideoRelationship(-42, video.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MotorShow.createHasMainVideoRelationship(motorShow.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(MotorShow.createHasMainVideoRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
