import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Company} from "../../../../../../../../src/models/node-types/companies/Company"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const company = await seedNode(DbNodeType.Company)
    const video = await seedNode(DbNodeType.Video)

    await expect(Company.createHasMainVideoRelationship(company.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Company.createHasMainVideoRelationship(company.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
