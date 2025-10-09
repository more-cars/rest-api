import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a CAR MODEL {string} with the following valid data',
    async (label: string, dataTable: DataTable) => {
        const rows = dataTable.hashes()

        const data: any = {}
        rows.forEach((row) => {
            if (['built_from', 'built_to', 'generation', 'total_production'].includes(row.key)) {
                data[row.key] = parseInt(row.value)
            } else {
                data[row.key] = row.value
            }
        })

        const response = await axios
            .post(`${process.env.API_URL}/car-models`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
        world.rememberNode(response?.data.data, label, 'car model')
    })
