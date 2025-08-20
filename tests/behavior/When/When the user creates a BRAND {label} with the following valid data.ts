import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a BRAND {string} with the following valid/mixed data',
    async (label: string, dataTable: DataTable) => {
        const rows = dataTable.hashes()

        const data: any = {}
        rows.forEach((row) => {
            if (['founded', 'defunct'].includes(row.key)) {
                data[row.key] = parseInt(row.value)
            } else {
                data[row.key] = row.value
            }
        })

        const response = await axios
            .post(`${process.env.API_URL}/brands`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data, label)
    })
