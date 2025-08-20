import {When, world} from "@cucumber/cucumber"
import axios from "axios"

When('the user requests all {string}s',
    async (nodeType: string) => {
        let path: string

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
            .get(`${process.env.API_URL}/${path}`)

        world.rememberResponse(response)
    })
