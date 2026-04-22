import {expect, test} from 'vitest'
import {addMoreCarsIdToRelationshipQuery} from "../../../../../src/db/relationships/addMoreCarsIdToRelationship"

test('cypher query is correctly assembled for "add more cars id to relationship" request', async () => {
    const query = addMoreCarsIdToRelationshipQuery(
        "112c8977-d3b2-4f06-8da2-e290ac980dd4",
        42)

    expect(query)
        .toEqual(
            "MATCH (a)-[r]-(b)\n" +
            "  WHERE elementId(r) = '112c8977-d3b2-4f06-8da2-e290ac980dd4'\n" +
            "SET r.mc_id = 42\n" +
            "RETURN a, r, b\n" +
            "  LIMIT 1")
})
