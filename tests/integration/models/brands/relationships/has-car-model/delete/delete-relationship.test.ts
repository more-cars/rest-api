import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a ›has-car-model‹ relationship', () => {
    test('BRAND node does not exist', async () => {
        const brand = await seedNode(ControllerNodeType.Brand)

        await expect(Brand.deleteHasCarModelRelationship(brand.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(ControllerNodeType.CarModel)

        await expect(Brand.deleteHasCarModelRelationship(-42, carModel.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BRAND node and CAR MODEL node do not exist', async () => {
        await expect(Brand.deleteHasCarModelRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-car-model‹ relationship', async () => {
        const brand = await seedNode(ControllerNodeType.Brand)
        const carModel = await seedNode(ControllerNodeType.CarModel)

        await expect(Brand.deleteHasCarModelRelationship(brand.properties.id, carModel.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-car-model‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.Brand, ControllerNodeType.CarModel, RelationshipType.BrandHasCarModel)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BrandHasCarModel,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Brand.deleteHasCarModelRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BrandHasCarModel,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
