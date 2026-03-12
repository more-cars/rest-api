import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ProgrammeEpisode} from "../../../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A PROGRAMME EPISODE can have multiple ›covers-car-model‹ relationships', async () => {
    const programmeEpisode = await seedNode(DbNodeType.ProgrammeEpisode)
    const carModelsAmount = 3
    const carModels = await seedNodes(DbNodeType.CarModel, carModelsAmount)

    for (const carModel of carModels) {
        await ProgrammeEpisode.createCoversCarModelRelationship(programmeEpisode.properties.id, carModel.properties.id)
    }

    const relationships = await getRelationshipCollection(programmeEpisode.properties.id, RelationshipType.ProgrammeEpisodeCoversCarModel)

    expect(relationships.length)
        .toBe(carModelsAmount)
})
