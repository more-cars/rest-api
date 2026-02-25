import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"
import {getBasePathFragmentForNodeType} from "../../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"

When('the user creates a(n) {string} with the following data',
    async (nodeType: string, dataTable: DataTable) => {
        const data: any = {}
        const path = getBasePathFragmentForNodeType(nodeType.toLowerCase() as ControllerNodeType)

        const properties = dataTable.hashes()
        properties.forEach((property) => {
            if (!isNaN(Number(property.value))) {
                data[property.key] = Number(property.value)
            } else {
                data[property.key] = property.value
            }
        })

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
