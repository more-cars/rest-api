import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›achieved-with-car-model-variant‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.LAP_TIME, ControllerNodeType.CAR_MODEL_VARIANT, RelationshipType.LapTimeAchievedWithCarModelVariant)
        const expectedLapTimeId = expectedRelationship.start_node.properties.id
        const expectedCarModelVariantId = expectedRelationship.end_node.properties.id
        const actualRelationship = await LapTime.getAchievedWithCarModelVariantRelationship(expectedLapTimeId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.properties.id)
            .toBe(expectedLapTimeId)

        expect(actualRelationship.destination.properties.id)
            .toBe(expectedCarModelVariantId)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        await expect(LapTime.getAchievedWithCarModelVariantRelationship(lapTime.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(LapTime.getAchievedWithCarModelVariantRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
