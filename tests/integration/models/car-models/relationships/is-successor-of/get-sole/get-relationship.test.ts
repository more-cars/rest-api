import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {CarModelIsSuccessorOfSchema} from "../../../../../../_toolbox/schemas/CarModelIsSuccessorOfSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›is-successor-of‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship('car model', 'car model', DbRelationship.CarModelIsSuccessorOf)
        const actualRelationship = await CarModel.getIsSuccessorOfRelationship(expectedRelationship.start_node_id)

        validateJson(actualRelationship, CarModelIsSuccessorOfSchema)

        expect(actualRelationship.car_model_id)
            .toBe(expectedRelationship.start_node_id)

        expect(actualRelationship.partner_id)
            .toBe(expectedRelationship.end_node_id)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedCarModel()

        await expect(CarModel.getIsSuccessorOfRelationship(carModel.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(CarModel.getIsSuccessorOfRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
