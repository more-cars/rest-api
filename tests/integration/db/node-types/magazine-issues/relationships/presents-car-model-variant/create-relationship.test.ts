import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›presents-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            magazineIssue.properties.id,
            carModelVariant.properties.id,
            RelationshipType.MagazineIssuePresentsCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.MagazineIssuePresentsCarModelVariant)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', magazineIssue.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        const createdRelationship = await createRelationship(
            magazineIssue.properties.id,
            -42,
            RelationshipType.MagazineIssuePresentsCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
