import {Given} from "@cucumber/cucumber"
import axios from "axios"
import {BrandNode} from "../../../src/types/brands/BrandNode"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"

Given('there exists a relationship {string} between BRAND {string} and CAR MODEL {string}',
    async function (relationshipLabel: string, brandLabel: string, carModelLabel: string) {
        const brand: BrandNode = this.brand[brandLabel]
        const carModel: CarModelNode = this.carmodel[carModelLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })

        this.relationship[relationshipLabel] = this.latestResponse.data
    })
