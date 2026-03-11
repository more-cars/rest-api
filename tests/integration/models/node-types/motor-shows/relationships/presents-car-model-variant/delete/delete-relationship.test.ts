import {describe, expect, test} from 'vitest'
import {MotorShow} from "../../../../../../../../src/models/node-types/motor-shows/MotorShow"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›presents-car-model-variant‹ relationship', () => {
    test('MOTOR SHOW node does not exist', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        await expect(MotorShow.deletePresentsCarModelVariantRelationship(motorShow.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(MotorShow.deletePresentsCarModelVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MOTOR SHOW node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(MotorShow.deletePresentsCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›presents-car-model-variant‹ relationship', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(MotorShow.deletePresentsCarModelVariantRelationship(motorShow.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›presents-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.MotorShow, DbNodeType.CarModelVariant, RelationshipType.MotorShowPresentsCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MotorShowPresentsCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await MotorShow.deletePresentsCarModelVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MotorShowPresentsCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
