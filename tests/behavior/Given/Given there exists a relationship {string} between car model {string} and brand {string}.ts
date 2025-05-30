import {Given} from "@cucumber/cucumber"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"
import {BrandNode} from "../../../src/types/brands/BrandNode"
import axios from "axios"

Given('there exists a relationship {string} between car model {string} and brand {string}',
    async function (realationshipLabel: string, carModelLabel: string, brandLabel: string) {
        const carModel: CarModelNode = this.carmodel[carModelLabel]
        const brand: BrandNode = this.brand[brandLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand/${brand.id}`)
            .catch(error => {
                console.error(error)
            })

        this.relationship[realationshipLabel] = this.latestResponse.data
    })
