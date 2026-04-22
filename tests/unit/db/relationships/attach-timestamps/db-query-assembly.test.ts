import {expect, test} from 'vitest'
import {addTimestampsToRelationshipQuery} from "../../../../../src/db/relationships/addTimestampsToRelationship"

test('cypher query is correctly assembled for "add timestamps to relationship" request', async () => {
    const query = addTimestampsToRelationshipQuery(
        "222c8977-d3b2-4f06-8da2-e290ac980dd4",
        "2024-04-13T10:04:06.682Z",
        "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual("MATCH (a)-[r]-(b)\n" +
            "  WHERE elementId(r) = '222c8977-d3b2-4f06-8da2-e290ac980dd4'\n" +
            "SET\n" +
            "r.created_at = '2024-04-13T10:04:06.682Z',\n" +
            "r.updated_at = '2025-05-14T11:05:07.793Z'\n" +
            "RETURN a, r, b\n" +
            "  LIMIT 1")
})
