import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {NodeType} from "../../_toolbox/NodeType"

When('the user creates a {string} {string} with the following data',
    async (nodeType: string, label: string, dataTable: DataTable) => {
        const rows = dataTable.hashes()

        const data: any = {}
        rows.forEach((row) => {
            switch (row.datatype) {
                case 'string':
                    data[row.key] = row.value
                    break
                case 'number':
                    data[row.key] = parseInt(row.value)
                    break
                case 'boolean':
                    data[row.key] = (row.value.toLowerCase() === 'true')
                    break
            }
        })

        const response = await axios
            .post(`${process.env.API_URL}/${getBasePathFragmentForNodeType(nodeType.toLowerCase() as NodeType)}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data, label, nodeType)
    })
