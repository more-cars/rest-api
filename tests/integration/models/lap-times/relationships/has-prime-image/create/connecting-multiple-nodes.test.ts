import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A LAP TIME cannot have multiple ›has-prime-image‹ relationships', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await LapTime.createHasPrimeImageRelationship(lapTime.id, image.id)
    }

    const relationships = await getRelationshipsForSpecificNode(lapTime.id, DbRelationship.LapTimeHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
