import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›covered-by-magazine-issue‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)
        await seedRelationshipForStartNode(carModel.properties.id, DbNodeType.MagazineIssue, RelationshipType.CarModelCoveredByMagazineIssue)
        await seedRelationshipForStartNode(carModel.properties.id, DbNodeType.MagazineIssue, RelationshipType.CarModelCoveredByMagazineIssue)

        const relationships = await getRelationshipCollection(
            carModel.properties.id,
            RelationshipType.CarModelCoveredByMagazineIssue,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        const relationships = await getRelationshipCollection(
            carModel.properties.id,
            RelationshipType.CarModelCoveredByMagazineIssue,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelCoveredByMagazineIssue,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
