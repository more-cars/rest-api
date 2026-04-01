import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const video = await seedNode(DbNodeType.Video)

    await expect(MotorShow.createHasMainVideoRelationship(motorShow.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MotorShow.createHasMainVideoRelationship(motorShow.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
