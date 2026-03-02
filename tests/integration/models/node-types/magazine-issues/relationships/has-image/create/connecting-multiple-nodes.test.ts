import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MAGAZINE ISSUE can have multiple ›has-image‹ relationships', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await MagazineIssue.createHasImageRelationship(magazineIssue.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(magazineIssue.properties.id, RelationshipType.MagazineIssueHasImage)

    expect(relationships.length)
        .toBe(imagesAmount)
})
