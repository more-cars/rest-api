import {DataTable, When, world} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a(n) {string} with the following data',
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
            .post(`${process.env.API_URL}/${path}`, data)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
