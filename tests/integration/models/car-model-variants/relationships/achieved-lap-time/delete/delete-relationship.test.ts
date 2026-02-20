import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›achieved-lap-time‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        await expect(CarModelVariant.deleteAchievedLapTimeRelationship(carModelVariant.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        await expect(CarModelVariant.deleteAchievedLapTimeRelationship(-42, lapTime.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and LAP TIME node do not exist', async () => {
        await expect(CarModelVariant.deleteAchievedLapTimeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›achieved-lap-time‹ relationship', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        await expect(CarModelVariant.deleteAchievedLapTimeRelationship(carModelVariant.properties.id, lapTime.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›achieved-lap-time‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.CAR_MODEL_VARIANT, ControllerNodeType.LAP_TIME, RelationshipType.CarModelVariantAchievedLapTime)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantAchievedLapTime,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteAchievedLapTimeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantAchievedLapTime,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
