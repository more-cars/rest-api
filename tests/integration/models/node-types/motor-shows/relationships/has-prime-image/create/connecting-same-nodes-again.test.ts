import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const motorShow = await seedNode(DbNodeType.MotorShow)
    const image = await seedNode(DbNodeType.Image)

    await expect(MotorShow.createHasPrimeImageRelationship(motorShow.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(MotorShow.createHasPrimeImageRelationship(motorShow.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
