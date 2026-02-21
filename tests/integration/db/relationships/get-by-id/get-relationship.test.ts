import {describe, expect, test} from 'vitest'
import assert from "assert"
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {getRelationshipById} from "../../../../../src/db/relationships/getRelationshipById"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Requesting a relationship', () => {
    test('relationship exists', async () => {
        const expectedRelationship = await seedRelationship(ControllerNodeType.Brand, ControllerNodeType.CarModel, RelationshipType.BrandHasCarModel)
        const actualRelationship = await getRelationshipById(expectedRelationship.id)

        if (!actualRelationship) {
            assert.fail('Could not fetch relationship')
        } else {
            expect(actualRelationship.start_node.properties.id)
                .toBe(expectedRelationship.start_node.properties.id)

            expect(actualRelationship.end_node.properties.id)
                .toBe(expectedRelationship.end_node.properties.id)
        }
    })

    test('relationship does not exist', async () => {
        const relationship = await getRelationshipById(-42)

        expect(relationship)
            .toBeFalsy()
    })
})
