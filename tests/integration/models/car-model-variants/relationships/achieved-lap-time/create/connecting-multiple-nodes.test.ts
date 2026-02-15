import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A CAR MODEL VARIANT can have multiple ›achieved-lap-time‹ relationships', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(NodeTypeEnum.LAP_TIME, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await CarModelVariant.createAchievedLapTimeRelationship(carModelVariant.id, lapTime.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.id, DbRelationship.CarModelVariantAchievedLapTime, NodeTypeLabel.LapTime)

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
