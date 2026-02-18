import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACING EVENT can have multiple ›has-image‹ relationships', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await RacingEvent.createHasImageRelationship(racingEvent.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.id,
        RelationshipType.RacingEventHasImage,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
