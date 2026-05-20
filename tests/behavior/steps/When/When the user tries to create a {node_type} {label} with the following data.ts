import {DataTable, When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user tries to create a {string} with the following data',
    async (nodeType: string, dataTable: DataTable) => {
        const data: Record<string, string | number | boolean | null> = {}

        const properties = dataTable.hashes()
        properties.forEach((property) => {
            if (property.value === '') {
                data[property.key] = null
            } else if (!isNaN(Number(property.value))) {
                data[property.key] = Number(property.value)
            } else if (property.value === 'true') {
                data[property.key] = true
            } else if (property.value === 'false') {
                data[property.key] = false
            } else {
                data[property.key] = property.value
            }
        })

        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}`

        await performApiRequest(path, 'POST', data)
    })
