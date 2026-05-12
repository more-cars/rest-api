import {expect, test} from 'vitest'
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {CarModelNode} from "../../../../../../src/db/node-types/car-models/types/CarModelNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        name: "Penny's",
        built_from: null,
        built_to: null,
        generation: null,
        internal_code: "'E99'''A'",
        total_production: null,
    }
    const createdNode = await createDbNode(DbNodeType.CarModel, data) as CarModelNode

    expect(createdNode.properties.name)
        .toEqual("Penny's")

    expect(createdNode.properties.internal_code)
        .toEqual("'E99'''A'")
})
