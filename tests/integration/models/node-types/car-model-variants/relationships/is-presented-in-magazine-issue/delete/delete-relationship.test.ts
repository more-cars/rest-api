import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›is-presented-in-magazine-issue‹ relationship', () => {
    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(CarModelVariant.deleteIsPresentedInMagazineIssueRelationship(carModelVariant.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(CarModelVariant.deleteIsPresentedInMagazineIssueRelationship(-42, magazineIssue.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node and MAGAZINE ISSUE node do not exist', async () => {
        await expect(CarModelVariant.deleteIsPresentedInMagazineIssueRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-presented-in-magazine-issue‹ relationship', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(CarModelVariant.deleteIsPresentedInMagazineIssueRelationship(carModelVariant.properties.id, magazineIssue.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›is-presented-in-magazine-issue‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModelVariant, DbNodeType.MagazineIssue, RelationshipType.CarModelVariantIsPresentedInMagazineIssue)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantIsPresentedInMagazineIssue,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModelVariant.deleteIsPresentedInMagazineIssueRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelVariantIsPresentedInMagazineIssue,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
