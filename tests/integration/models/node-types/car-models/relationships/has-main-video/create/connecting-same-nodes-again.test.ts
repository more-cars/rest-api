import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const video = await seedNode(DbNodeType.Video)

    await expect(CarModel.createHasMainVideoRelationship(carModel.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createHasMainVideoRelationship(carModel.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
