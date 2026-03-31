import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Company} from "../../../../../../../../src/models/node-types/companies/Company"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A COMPANY can have multiple ›has-video‹ relationships', async () => {
    const company = await seedNode(DbNodeType.Company)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await Company.createHasVideoRelationship(company.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(company.properties.id, RelationshipType.CompanyHasVideo)

    expect(relationships.length)
        .toBe(videosAmount)
})
