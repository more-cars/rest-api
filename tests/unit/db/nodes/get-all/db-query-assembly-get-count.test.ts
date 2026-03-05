import {describe, expect, test} from 'vitest'
import {getAllDbNodeTypes} from "../../../../_toolbox/getAllDbNodeTypes"
import {fetchNodeCountByNodeTypeQuery} from "../../../../../src/db/nodes/fetchNodeCountByNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('database query for fetching the node count', () => {
    test.each(getAllDbNodeTypes())('for node type $0', async (nodeType) => {
        const query = fetchNodeCountByNodeTypeQuery(nodeType)

        expect(query)
            .toEqual(
                "MATCH (node:" + nodeType + "_" + appInstanceId + ")\n" +
                "RETURN count(node) as nodeCount")
    })
})
