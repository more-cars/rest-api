import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›belongs-to-brand‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.CAR_MODEL, ControllerNodeType.BRAND, RelationshipType.CarModelBelongsToBrand)
        const expectedCarModelId = expectedRelationship.start_node.properties.id
        const expectedBrandId = expectedRelationship.end_node.properties.id
        const actualRelationship = await CarModel.getBelongsToBrandRelationship(expectedCarModelId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedCarModelId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedBrandId)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

        await expect(CarModel.getBelongsToBrandRelationship(carModel.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(CarModel.getBelongsToBrandRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
