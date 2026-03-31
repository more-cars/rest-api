import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-video‹ relationship again', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const video = await seedNode(DbNodeType.Video)

    await expect(ModelCar.createHasVideoRelationship(modelCar.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(ModelCar.createHasVideoRelationship(modelCar.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
