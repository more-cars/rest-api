import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›is-successor-of‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.CAR_MODEL, RelationshipType.CarModelIsSuccessorOf)
        const expectedCarModelId = expectedRelationship.start_node_id
        const expectedPredecessorId = expectedRelationship.end_node_id
        const actualRelationship = await CarModel.getIsSuccessorOfRelationship(expectedCarModelId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedCarModelId)

        expect(actualRelationship.destination.id)
            .toBe(expectedPredecessorId)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

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
