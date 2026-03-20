import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›has-price‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModelVariant, DbNodeType.Price, RelationshipType.CarModelVariantHasPrice)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantHasPrice,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantHasPrice,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantHasPrice,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const price = await seedNode(DbNodeType.Price)

        const relationship = await deleteSpecificRelationship(
            carModelVariant.properties.id,
            price.properties.id,
            RelationshipType.CarModelVariantHasPrice,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.CarModelVariantHasPrice,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
