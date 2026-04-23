import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {RacingGameNode} from "../../../../../../src/db/node-types/racing-games/types/RacingGameNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "'Forza Motorsport 7''",
        release_year: 2017,
        developer: "'Turn 10 Studios''",
        publisher: "'Microsoft Studios''",
    }

    const createdNode = await createNeo4jNode(DbNodeType.RacingGame, data) as RacingGameNode

    expect(createdNode.properties.name)
        .toEqual("'Forza Motorsport 7''")

    expect(createdNode.properties.developer)
        .toEqual("'Turn 10 Studios''")

    expect(createdNode.properties.publisher)
        .toEqual("'Microsoft Studios''")
})
