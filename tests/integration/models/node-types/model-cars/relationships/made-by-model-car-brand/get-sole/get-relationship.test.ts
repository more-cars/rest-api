import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›made-by-model-car-brand‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.ModelCar, DbNodeType.ModelCarBrand, RelationshipType.ModelCarMadeByModelCarBrand)
        const expectedModelCarId = expectedRelationship.start_node.properties.id
        const expectedModelCarBrandId = expectedRelationship.end_node.properties.id
        const actualRelationship = await ModelCar.getMadeByModelCarBrandRelationship(expectedModelCarId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedModelCarId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedModelCarBrandId)
    })

    test('node exists, but not the relationship', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        await expect(ModelCar.getMadeByModelCarBrandRelationship(modelCar.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(ModelCar.getMadeByModelCarBrandRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
