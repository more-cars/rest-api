import {expect, test} from 'vitest'
import {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
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
    const query = createNodeQuery(DbNodeType.Brand, data)

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
