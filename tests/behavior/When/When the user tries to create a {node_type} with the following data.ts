import {DataTable, When} from "@cucumber/cucumber"
import axios from "axios"

When('the user tries to create a(n) {string} with the following data', async function (nodeType: string, dataTable: DataTable) {
    const data: any = {}
    let path: string

    const properties = dataTable.hashes()
    properties.forEach((property) => {
        data[property.key] = property.value
    })

    switch (nodeType.toLowerCase()) {
        case 'brand':
            path = 'brands'
            break
        case 'car model':
            path = 'car-models'
            break
        case 'image':
            path = 'images'
            break
        default:
            return
    }

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/${path}`, data, {
            validateStatus: function (status) {
                return status === 422 // treating the 422 as a "good" status code, so axios does not fail the request
            }
        })
})
