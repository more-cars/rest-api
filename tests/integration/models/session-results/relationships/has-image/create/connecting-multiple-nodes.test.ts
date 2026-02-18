import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A SESSION RESULT can have multiple ›has-image‹ relationships', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await SessionResult.createHasImageRelationship(sessionResult.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        sessionResult.id,
        RelationshipType.SessionResultHasImage,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
