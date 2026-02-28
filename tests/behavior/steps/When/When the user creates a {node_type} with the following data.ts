import {DataTable, When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user creates a(n) {string} with the following data',
    async (nodeType: string, dataTable: DataTable) => {
        const data: any = {}

        const properties = dataTable.hashes()
        properties.forEach((property) => {
            if (!isNaN(Number(property.value))) {
                data[property.key] = Number(property.value)
            } else {
                data[property.key] = property.value
            }
        })

        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}`

        const response = await performApiRequest(path, 'POST', data)
        world.rememberResponse(response)
    })
