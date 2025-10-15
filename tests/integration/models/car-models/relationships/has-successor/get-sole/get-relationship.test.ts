import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {CarModelHasSuccessorSchema} from "../../../../../../_toolbox/schemas/CarModelHasSuccessorSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›has-successor‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship('car model', 'car model', DbRelationship.CarModelHasSuccessor)
        const actualRelationship = await CarModel.getHasSuccessorRelationship(expectedRelationship.start_node_id)

        validateJson(actualRelationship, CarModelHasSuccessorSchema)

        expect(actualRelationship.car_model_id)
            .toBe(expectedRelationship.start_node_id)

        expect(actualRelationship.partner_id)
            .toBe(expectedRelationship.end_node_id)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedCarModel()

        await expect(CarModel.getHasSuccessorRelationship(carModel.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(CarModel.getHasSuccessorRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
