import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {RaceTrackNode} from "../../../../../../src/db/node-types/race-tracks/types/RaceTrackNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Lausitzring''",
        opened: 2000,
        closed: null,
        type: "'permanent race track''",
        location: "'Klettwitz''",
        geo_position: "'51°32&#39;0&#34;N 13°55&#39;10&#34;E''",
        country_code: "'DE''",
    }

    const createdNode = await createNeo4jNode(DbNodeType.RaceTrack, data) as RaceTrackNode

    expect(createdNode.properties.name)
        .toEqual("'Lausitzring''")

    expect(createdNode.properties.type)
        .toEqual("'permanent race track''")

    expect(createdNode.properties.location)
        .toEqual("'Klettwitz''")

    expect(createdNode.properties.geo_position)
        .toEqual("'51°32&#39;0&#34;N 13°55&#39;10&#34;E''")

    expect(createdNode.properties.country_code)
        .toEqual("'DE''")
})
