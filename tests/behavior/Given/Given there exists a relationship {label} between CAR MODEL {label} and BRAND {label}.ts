import {Given} from "@cucumber/cucumber"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"
import {BrandNode} from "../../../src/models/brands/types/BrandNode"
import axios from "axios"

Given('there exists a relationship {string} between CAR MODEL {string} and BRAND {string}',
    async function (relationshipLabel: string, carModelLabel: string, brandLabel: string) {
        const carModel: CarModelNode = this.carmodel[carModelLabel]
        const brand: BrandNode = this.brand[brandLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
            .catch(error => {
                console.error(error)
            })

        this.relationship[relationshipLabel] = this.latestResponse.data
    })
