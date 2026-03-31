import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MODEL CAR cannot have multiple ›has-main-video‹ relationships', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const videosAmount = 3
    const videos = await seedNodes(DbNodeType.Video, videosAmount)

    for (const video of videos) {
        await ModelCar.createHasMainVideoRelationship(modelCar.properties.id, video.properties.id)
    }

    const relationships = await getRelationshipCollection(modelCar.properties.id, RelationshipType.ModelCarHasMainVideo)

    expect(relationships.length)
        .toBe(1)
})
