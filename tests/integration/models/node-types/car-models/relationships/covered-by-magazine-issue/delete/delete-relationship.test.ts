import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›covered-by-magazine-issue‹ relationship', () => {
    test('CAR MODEL node does not exist', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        await expect(CarModel.deleteCoveredByMagazineIssueRelationship(carModel.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(CarModel.deleteCoveredByMagazineIssueRelationship(-42, magazineIssue.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL node and MAGAZINE ISSUE node do not exist', async () => {
        await expect(CarModel.deleteCoveredByMagazineIssueRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›covered-by-magazine-issue‹ relationship', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(CarModel.deleteCoveredByMagazineIssueRelationship(carModel.properties.id, magazineIssue.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›covered-by-magazine-issue‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.CarModel, DbNodeType.MagazineIssue, RelationshipType.CarModelCoveredByMagazineIssue)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelCoveredByMagazineIssue,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await CarModel.deleteCoveredByMagazineIssueRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.CarModelCoveredByMagazineIssue,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
