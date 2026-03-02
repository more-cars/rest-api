import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE ISSUE cannot have multiple ›belongs-to-magazine‹ relationships', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const magazinesAmount = 3
    const magazines = await seedNodes(DbNodeType.Magazine, magazinesAmount)

    for (const magazine of magazines) {
        await MagazineIssue.createBelongsToMagazineRelationship(magazineIssue.properties.id, magazine.properties.id)
    }

    const relationships = await getRelationshipCollection(magazineIssue.properties.id, RelationshipType.MagazineIssueBelongsToMagazine)

    expect(relationships.length)
        .toBe(1)
})
