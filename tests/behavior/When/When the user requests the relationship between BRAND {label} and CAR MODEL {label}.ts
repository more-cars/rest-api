import {When} from "@cucumber/cucumber"
import axios from "axios"
import type {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"
import type {BrandNode} from "../../../src/models/brands/types/BrandNode"

When('the user requests the relationship between BRAND {string} and CAR MODEL {string}',
    async function (brandLabel: string, carModelLabel: string) {
        const brand: BrandNode = this.brand[brandLabel]
        const carModel: CarModelNode = this.carmodel[carModelLabel]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/brands/${brand.id}/has-car-model/${carModel.id}`)
            .catch(error => {
                console.error(error)
            })
    })
