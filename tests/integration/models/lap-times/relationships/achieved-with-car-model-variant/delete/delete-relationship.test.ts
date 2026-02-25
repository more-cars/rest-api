import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›achieved-with-car-model-variant‹ relationship', () => {
    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(LapTime.deleteAchievedWithCarModelVariantRelationship(lapTime.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(LapTime.deleteAchievedWithCarModelVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(LapTime.deleteAchievedWithCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›achieved-with-car-model-variant‹ relationship', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(LapTime.deleteAchievedWithCarModelVariantRelationship(lapTime.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›achieved-with-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.LapTime, DbNodeType.CarModelVariant, RelationshipType.LapTimeAchievedWithCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeAchievedWithCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await LapTime.deleteAchievedWithCarModelVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeAchievedWithCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
