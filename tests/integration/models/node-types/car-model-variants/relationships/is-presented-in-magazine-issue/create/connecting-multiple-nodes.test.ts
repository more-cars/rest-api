import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL VARIANT can have multiple ›is-presented-in-magazine-issue‹ relationships', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const magazineIssuesAmount = 3
    const magazineIssues = await seedNodes(DbNodeType.MagazineIssue, magazineIssuesAmount)

    for (const magazineIssue of magazineIssues) {
        await CarModelVariant.createIsPresentedInMagazineIssueRelationship(carModelVariant.properties.id, magazineIssue.properties.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.properties.id, RelationshipType.CarModelVariantIsPresentedInMagazineIssue)

    expect(relationships.length)
        .toBe(magazineIssuesAmount)
})
