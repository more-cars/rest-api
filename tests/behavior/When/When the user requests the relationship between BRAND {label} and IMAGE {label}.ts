import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"
import type {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user requests the relationship between BRAND {string} and IMAGE {string}',
    async (brandLabel: string, imageLabel: string) => {
        const image: ImageNode = world.recallNode(imageLabel)
        const brand: BrandNode = world.recallNode(brandLabel)

        const response = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
