import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A CAR MODEL VARIANT can have multiple ›achieved-lap-time‹ relationships', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(ControllerNodeType.LAP_TIME, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await CarModelVariant.createAchievedLapTimeRelationship(carModelVariant.id, lapTime.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.id, RelationshipType.CarModelVariantAchievedLapTime, Neo4jNodeType.LapTime)

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
