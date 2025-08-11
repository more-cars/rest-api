import {Given} from "@cucumber/cucumber"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import axios from "axios"
import type {ImageNode} from "../../../src/models/images/types/ImageNode"

Given('there exists a relationship {string} between IMAGE {string} and BRAND {string}',
    async function (relationshipLabel: string, imageLabel: string, brandLabel: string) {
        const image: ImageNode = this.image[imageLabel]
        const brand: BrandNode = this.brand[brandLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/images/${image.id}/belongs-to-node/${brand.id}`)
            .catch(error => {
                console.error(error)
            })

        this.relationship[relationshipLabel] = this.latestResponse.data
    })
