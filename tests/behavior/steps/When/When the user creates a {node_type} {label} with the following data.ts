import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"

When('the user (tries to )create(s) a {string} {string} with the following data',
    async (nodeType: string, label: string, dataTable: DataTable) => {
        const rows = dataTable.hashes()

        const data: any = {}
        rows.forEach((row) => {
            switch (row.datatype) {
                case 'string':
                    data[row.key] = row.value
                    break
                case 'number':
                    data[row.key] = parseFloat(row.value)
                    break
                case 'boolean':
                    data[row.key] = (row.value.toLowerCase() === 'true')
                    break
            }
        })

        const response = await axios
            .post(`${process.env.API_URL}/${getBasePathFragmentForNodeType(nodeType.toLowerCase() as ControllerNodeType)}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data.data, label, nodeType)
    })
