import {expect, test} from 'vitest'
import {InputBrandCreate} from "../../../../../src/db/node-types/brands/types/InputBrandCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputBrandCreate = {
        name: "Test's Brand",
        full_name: "Test's Brand Full' Name",
        founded: null,
        defunct: null,
        wmi: "A'BC",
        hsn: "00''05",
    }

    const query = createNodeQuery(DbNodeType.Brand, data)

    expect(query)
        .toEqual(
            "CREATE (node:Brand_" + appInstanceId + " {\n" +
            "  name: 'Test\\'s Brand',\n" +
            "  full_name: 'Test\\'s Brand Full\\' Name',\n" +
            "  founded: null,\n" +
            "  defunct: null,\n" +
            "  wmi: 'A\\'BC',\n" +
            "  hsn: '00\\'\\'05'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
