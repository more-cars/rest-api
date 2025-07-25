import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a CAR MODEL {string} with the following valid data',
    async function (label: string, dataTable: DataTable) {
        const rows = dataTable.hashes()

        const data: any = {}
        rows.forEach((row) => {
            if (['built_from', 'built_to', 'generation', 'total_production'].includes(row.key)) {
                data[row.key] = parseInt(row.value)
            } else {
                data[row.key] = row.value
            }
        })

        this.carmodel[label] = data
        this.latestResponse = await axios
            .post(`${process.env.API_URL}/car-models`, data)
            .catch(error => {
                console.error(error)
            })
        this.carmodel[label]['id'] = this.latestResponse.data.id
    })
