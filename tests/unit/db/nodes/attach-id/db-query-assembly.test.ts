import {expect, test} from 'vitest'
import {addMoreCarsIdToNodeQuery} from "../../../../../src/db/nodes/addMoreCarsIdToNode"

test('cypher query is correctly assembled for "add more cars id to node" request', async () => {
    const query = addMoreCarsIdToNodeQuery(
        "992c8977-d3b2-4f06-8da2-e290ac980dd4",
        42)

    expect(query)
        .toEqual(
            "MATCH (node)\n" +
            "  WHERE elementId(node) = '992c8977-d3b2-4f06-8da2-e290ac980dd4'\n" +
            "SET node.mc_id = 42\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
