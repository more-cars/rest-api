import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›achieved-session-result‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(CarModelVariant.deleteAchievedSessionResultRelationship(carModelVariant.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(DbNodeType.SessionResult)

        await expect(CarModelVariant.deleteAchievedSessionResultRelationship(-42, sessionResult.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and SESSION RESULT node do not exist', async () => {
        await expect(CarModelVariant.deleteAchievedSessionResultRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›achieved-session-result‹ relationship', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const sessionResult = await seedNode(DbNodeType.SessionResult)

        await expect(CarModelVariant.deleteAchievedSessionResultRelationship(carModelVariant.properties.id, sessionResult.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›achieved-session-result‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModelVariant, DbNodeType.SessionResult, RelationshipType.CarModelVariantAchievedSessionResult)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantAchievedSessionResult,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteAchievedSessionResultRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantAchievedSessionResult,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
