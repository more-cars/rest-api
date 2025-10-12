import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {Image} from "../../../../../../../src/models/images/Image"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/RelationshipSchema"

test('Both nodes and a ›belongs-to-node‹ relationship exist', async () => {
    const expectedRelationship = await seedRelationship('image', 'company', DbRelationship.NodeHasImage)
    const actualRelationship = await Image.getSpecificBelongsToNodeRelationship(expectedRelationship.start_node_id, expectedRelationship.end_node_id)

    validateJson(actualRelationship, RelationshipSchema)

    expect(actualRelationship.image_id)
        .toBe(expectedRelationship.start_node_id)

    expect(actualRelationship.partner_node_id)
        .toBe(expectedRelationship.end_node_id)
})
