import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {Relationship} from "../../../../../src/models/Relationship"
import {validateJson} from "../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../_toolbox/schemas/model/RelationshipSchema"
import {RelNotFoundError} from "../../../../../src/models/types/RelNotFoundError"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Requesting a relationship', () => {
    test('relationship exists', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.BRAND, NodeTypeEnum.CAR_MODEL, RelationshipType.BrandHasCarModel)
        const actualRelationship = await Relationship.findById(expectedRelationship.id)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedRelationship.start_node.id)

        expect(actualRelationship.destination.id)
            .toBe(expectedRelationship.end_node_id)
    })

    test('relationship does not exist', async () => {
        await expect(Relationship.findById(-42))
            .rejects
            .toThrow(RelNotFoundError)
    })
})
