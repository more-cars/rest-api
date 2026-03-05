import {describe, expect, test} from 'vitest'
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›presents-car-model-variant‹ relationship', () => {
    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(MagazineIssue.deletePresentsCarModelVariantRelationship(magazineIssue.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(MagazineIssue.deletePresentsCarModelVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(MagazineIssue.deletePresentsCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›presents-car-model-variant‹ relationship', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(MagazineIssue.deletePresentsCarModelVariantRelationship(magazineIssue.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›presents-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.MagazineIssue, DbNodeType.CarModelVariant, RelationshipType.MagazineIssuePresentsCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssuePresentsCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await MagazineIssue.deletePresentsCarModelVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssuePresentsCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
