import {extractBaseIdFromElementId} from "../../../../../src/db/extractBaseIdFromElementId.ts"

test.each([
    ["4:f86eb04b-536d-4319-a8e9-8cb965f985bc:4", 4],
    ["4:f86eb04b-536d-4319-a8e9-8cb965f985bc:9", 9],
    ["4:f86eb04b-536d-4319-a8e9-8cb965f985bc:110", 110],
])('base ID is correctly extracted from the Neo4j element id', async (elementId, expectedBaseId) => {
    const actualBaseId = extractBaseIdFromElementId(elementId)

    expect(expectedBaseId)
        .toEqual(actualBaseId)
})
