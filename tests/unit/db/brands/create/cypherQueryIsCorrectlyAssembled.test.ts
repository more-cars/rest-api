import {createNodeQuery} from "../../../../../src/db/nodes/brands/createNode"
import {InputBrandCreate} from "../../../../../src/db/nodes/brands/types/InputBrandCreate"

test('cypher query is correctly assembled for "create brand" request', async () => {
    const data: InputBrandCreate = {
        name: "Test Brand",
        full_name: "Test Brand Full Name",
        founded: null,
        defunct: 2020,
        wmi: null,
        hsn: "0005"
    }
    const query = createNodeQuery(data)

    expect(query)
        .toEqual(
            "CREATE (node:Brand {\n" +
            "  name:      'Test Brand',\n" +
            "  full_name: 'Test Brand Full Name',\n" +
            "  founded:   null,\n" +
            "  defunct:   2020,\n" +
            "  wmi:       null,\n" +
            "  hsn:       '0005'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
