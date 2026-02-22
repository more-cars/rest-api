import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {Relationship} from "../../../../../src/models/Relationship"
import {validateJson} from "../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../_toolbox/schemas/model/RelationshipSchema"
import {RelNotFoundError} from "../../../../../src/models/types/RelNotFoundError"

describe('Requesting a relationship', () => {
    test('relationship exists', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.Brand, DbNodeType.CarModel, RelationshipType.BrandHasCarModel)
        const actualRelationship = await Relationship.findById(expectedRelationship.id)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedRelationship.start_node.properties.id)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedRelationship.end_node.properties.id)
    })

    test('relationship does not exist', async () => {
        await expect(Relationship.findById(-42))
            .rejects
            .toThrow(RelNotFoundError)
    })
})
