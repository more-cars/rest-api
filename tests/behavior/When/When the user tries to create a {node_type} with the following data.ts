import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../_toolbox/NodeType"

When('the user tries to create a(n) {string} with the following data',
    async (nodeType: string, dataTable: DataTable) => {
        const data: any = {}
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)

        const properties = dataTable.hashes()
        properties.forEach((property) => {
            data[property.key] = property.value
        })

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)

        world.rememberResponse(response)
    })
