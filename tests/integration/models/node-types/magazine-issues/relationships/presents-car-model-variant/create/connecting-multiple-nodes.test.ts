import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE ISSUE can have multiple ›presents-car-model-variant‹ relationships', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(DbNodeType.CarModelVariant, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await MagazineIssue.createPresentsCarModelVariantRelationship(magazineIssue.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(magazineIssue.properties.id, RelationshipType.MagazineIssuePresentsCarModelVariant)

    expect(relationships.length)
        .toBe(carModelVariantsAmount)
})
