import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING EVENT can have multiple ›has-image‹ relationships', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await RacingEvent.createHasImageRelationship(racingEvent.id, image.id)
    }

    const relationships = await getRelationshipCollection(racingEvent.id, DbRelationship.RacingEventHasImage)

    expect(relationships.length)
        .toBe(imagesAmount)
})
