import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL can have multiple ›covered-by-magazine-issue‹ relationships', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const magazineIssuesAmount = 3
    const magazineIssues = await seedNodes(DbNodeType.MagazineIssue, magazineIssuesAmount)

    for (const magazineIssue of magazineIssues) {
        await CarModel.createCoveredByMagazineIssueRelationship(carModel.properties.id, magazineIssue.properties.id)
    }

    const relationships = await getRelationshipCollection(carModel.properties.id, RelationshipType.CarModelCoveredByMagazineIssue)

    expect(relationships.length)
        .toBe(magazineIssuesAmount)
})
