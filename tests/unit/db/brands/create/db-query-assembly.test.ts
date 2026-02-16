import {expect, test} from 'vitest'
import {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a BRAND node', async () => {
    const data: InputBrandCreate = {
        name: "Test Brand",
        full_name: "Test Brand Full Name",
        founded: null,
        defunct: 2020,
        wmi: null,
        hsn: "0005",
    }
    const query = createNodeQuery(NodeTypeLabel.Brand, data)

    expect(query)
        .toEqual(
            "CREATE (node:Brand_" + appInstanceId + " {\n" +
            "  name: 'Test Brand',\n" +
            "  full_name: 'Test Brand Full Name',\n" +
            "  founded: null,\n" +
            "  defunct: 2020,\n" +
            "  wmi: null,\n" +
            "  hsn: '0005'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
