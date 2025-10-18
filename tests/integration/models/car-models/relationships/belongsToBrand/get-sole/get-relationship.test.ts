import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›belongs-to-brand‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship('car model', 'brand', DbRelationship.CarModelBelongsToBrand)
        const actualRelationship = await CarModel.getBelongsToBrandRelationship(expectedRelationship.start_node_id)

        validateJson(actualRelationship, RelationshipSchema)

        expect(actualRelationship.origin.id)
            .toBe(expectedRelationship.start_node_id)

        expect(actualRelationship.destination.id)
            .toBe(expectedRelationship.end_node_id)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedCarModel()

        await expect(CarModel.getBelongsToBrandRelationship(carModel.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(CarModel.getBelongsToBrandRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
