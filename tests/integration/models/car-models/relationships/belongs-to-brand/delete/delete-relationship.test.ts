import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

describe('Deleting a ›belongs-to-brand‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        await expect(CarModel.deleteBelongsToBrandRelationship(carModel.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BRAND node does not exist', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        await expect(CarModel.deleteBelongsToBrandRelationship(-42, brand.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and BRAND node do not exist', async () => {
        await expect(CarModel.deleteBelongsToBrandRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-brand‹ relationship', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        const brand = await seedNode(NodeTypeEnum.BRAND)

        await expect(CarModel.deleteBelongsToBrandRelationship(carModel.id, brand.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-brand‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.BRAND, DbRelationship.CarModelBelongsToBrand)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.CarModelBelongsToBrand,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteBelongsToBrandRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.CarModelBelongsToBrand,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
