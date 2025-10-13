import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationship does not exist', async () => {
    const image = await seedNode('image')
    const partnerNode = await seedNode('company')

    const relationship = await deleteSpecificRelationship(
        image.id,
        partnerNode.id,
        DbRelationship.ImageBelongsToCompany,
    )

    expect(relationship)
        .toBeFalsy()
})
