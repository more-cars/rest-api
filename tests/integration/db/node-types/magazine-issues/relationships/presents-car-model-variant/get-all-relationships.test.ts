import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›presents-car-model-variant‹ relationships', () => {
    test('node and relationships exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        await seedRelationshipForStartNode(magazineIssue.properties.id, DbNodeType.CarModelVariant, RelationshipType.MagazineIssuePresentsCarModelVariant)
        await seedRelationshipForStartNode(magazineIssue.properties.id, DbNodeType.CarModelVariant, RelationshipType.MagazineIssuePresentsCarModelVariant)

        const relationships = await getRelationshipCollection(
            magazineIssue.properties.id,
            RelationshipType.MagazineIssuePresentsCarModelVariant,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        const relationships = await getRelationshipCollection(
            magazineIssue.properties.id,
            RelationshipType.MagazineIssuePresentsCarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.MagazineIssuePresentsCarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
