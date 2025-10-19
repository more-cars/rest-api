import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {Relationship} from "../../../../../src/models/relationships/Relationship"
import {validateJson} from "../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../_toolbox/schemas/model/RelationshipSchema"
import {RelationshipNotFoundError} from "../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a relationship', () => {
    test('relationship exists', async () => {
        const expectedRelationship = await seedRelationship('brand', 'car model', DbRelationship.BrandHasCarModel)
        const actualRelationship = await Relationship.findById(expectedRelationship.relationship_id)

        validateJson(actualRelationship, RelationshipSchema)

        expect(actualRelationship.origin.id)
            .toBe(expectedRelationship.start_node_id)

        expect(actualRelationship.destination.id)
            .toBe(expectedRelationship.end_node_id)
    })

    test('relationship does not exist', async () => {
        await expect(Relationship.findById(-42))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })
})
