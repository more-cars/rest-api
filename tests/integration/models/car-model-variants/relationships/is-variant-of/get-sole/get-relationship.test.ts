import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›is-variant-of‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.CAR_MODEL_VARIANT, ControllerNodeType.CAR_MODEL, RelationshipType.CarModelVariantIsVariantOf)
        const expectedCarModelVariantId = expectedRelationship.start_node.properties.id
        const expectedCarModelId = expectedRelationship.end_node.properties.id
        const actualRelationship = await CarModelVariant.getIsVariantOfRelationship(expectedCarModelVariantId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.properties.id)
            .toBe(expectedCarModelVariantId)

        expect(actualRelationship.destination.properties.id)
            .toBe(expectedCarModelId)
    })

    test('node exists, but not the relationship', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        await expect(CarModelVariant.getIsVariantOfRelationship(carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(CarModelVariant.getIsVariantOfRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
