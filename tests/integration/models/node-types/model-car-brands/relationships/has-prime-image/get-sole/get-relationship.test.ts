import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.ModelCarBrand, DbNodeType.Image, RelationshipType.ModelCarBrandHasPrimeImage)
        const expectedModelCarBrandId = expectedRelationship.start_node.properties.id
        const expectedImageId = expectedRelationship.end_node.properties.id
        const actualRelationship = await ModelCarBrand.getHasPrimeImageRelationship(expectedModelCarBrandId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedModelCarBrandId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedImageId)
    })

    test('node exists, but not the relationship', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        await expect(ModelCarBrand.getHasPrimeImageRelationship(modelCarBrand.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(ModelCarBrand.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
