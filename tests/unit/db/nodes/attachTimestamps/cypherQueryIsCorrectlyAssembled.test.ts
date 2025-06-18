import {addTimestampsToNodeQuery} from "../../../../../src/db/nodes/addTimestampsToNodeQuery"

test('cypher query is correctly assembled for "add timestamps to brand node" request', async () => {
    const query = addTimestampsToNodeQuery(
        "992c8977-d3b2-4f06-8da2-e290ac980dd4",
        "2024-04-13T10:04:06.682Z",
        "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual("MATCH (node)\n" +
            "  WHERE elementId(node) = '992c8977-d3b2-4f06-8da2-e290ac980dd4'\n" +
            "SET\n" +
            "node.created_at = '2024-04-13T10:04:06.682Z',\n" +
            "node.updated_at = '2025-05-14T11:05:07.793Z'\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
