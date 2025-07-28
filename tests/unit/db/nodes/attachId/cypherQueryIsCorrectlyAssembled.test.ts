import {expect, test} from 'vitest'
import {addMoreCarsIdToNodeQuery} from "../../../../../src/db/nodes/addMoreCarsIdToNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "add more cars id to brand" request', async () => {
    const query = addMoreCarsIdToNodeQuery(
        NodeTypeLabel.Brand,
        "992c8977-d3b2-4f06-8da2-e290ac980dd4",
        42)

    expect(query)
        .toEqual(
            "MATCH (node:Brand)\n" +
            "  WHERE elementId(node) = '992c8977-d3b2-4f06-8da2-e290ac980dd4'\n" +
            "SET node.mc_id = 42\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})

test('cypher query is correctly assembled for "add more cars id to car model" request', async () => {
    const query = addMoreCarsIdToNodeQuery(
        NodeTypeLabel.CarModel,
        "992c8977-d3b2-4f06-8da2-e290ac980dd4",
        41)

    expect(query)
        .toEqual(
            "MATCH (node:CarModel)\n" +
            "  WHERE elementId(node) = '992c8977-d3b2-4f06-8da2-e290ac980dd4'\n" +
            "SET node.mc_id = 41\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})

test('cypher query is correctly assembled for "add more cars id to image" request', async () => {
    const query = addMoreCarsIdToNodeQuery(
        NodeTypeLabel.Image,
        "992c8977-d3b2-4f06-8da2-e290ac980dd4",
        40)

    expect(query)
        .toEqual(
            "MATCH (node:Image)\n" +
            "  WHERE elementId(node) = '992c8977-d3b2-4f06-8da2-e290ac980dd4'\n" +
            "SET node.mc_id = 40\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
