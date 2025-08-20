import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"

When('the user tries to create a(n) {string} with the following data',
    async (nodeType: string, dataTable: DataTable) => {
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

        const response = await axios
            .post(`${process.env.API_URL}/${path}`, data, {
                validateStatus: function (status) {
                    return status === 400 // treating the 400 as a "good" status code, so axios does not fail the request
                }
            })

        world.rememberResponse(response)
    })
