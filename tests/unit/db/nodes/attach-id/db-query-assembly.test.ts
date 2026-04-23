import {expect, test} from 'vitest'
import {addMoreCarsIdToNodeQuery} from "../../../../../src/db/nodes/addMoreCarsIdToNode"

test('cypher query is correctly assembled for "add more cars id to node" request', async () => {
    const query = addMoreCarsIdToNodeQuery(
        42,
        "992c8977-d3b2-4f06-8da2-e290ac980dd4")

    expect(query)
        .toEqual(
            "MATCH (n)\n" +
            "  WHERE elementId(n) = '992c8977-d3b2-4f06-8da2-e290ac980dd4'\n" +
            "SET n.mc_id = 42\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
