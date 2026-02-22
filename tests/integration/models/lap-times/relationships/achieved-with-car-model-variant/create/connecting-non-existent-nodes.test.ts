import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›achieved-with-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(lapTime.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createAchievedWithCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
