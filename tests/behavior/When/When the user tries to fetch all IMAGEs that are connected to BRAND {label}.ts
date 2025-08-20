import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user tries to fetch all IMAGEs that are connected to BRAND {string}',
    async (label: string) => {
        const brand: BrandNode = world.recallNode(label)

        const response = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-image`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
