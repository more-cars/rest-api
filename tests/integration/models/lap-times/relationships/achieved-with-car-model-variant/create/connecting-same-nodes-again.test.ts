import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›achieved-with-car-model-variant‹ relationship again', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(lapTime.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(lapTime.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
