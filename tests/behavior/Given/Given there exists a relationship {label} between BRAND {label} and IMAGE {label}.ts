import {Given} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

Given('there exists a relationship {string} between BRAND {string} and IMAGE {string}',
    async function (relationshipLabel: string, brandLabel: string, imageLabel: string) {
        const brand: BrandNode = this.brand[brandLabel]
        const image: ImageNode = this.image[imageLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-image/${image.id}`)
            .catch(error => {
                console.error(error)
            })

        this.relationship[relationshipLabel] = this.latestResponse.data
    })
