import {Given} from "@cucumber/cucumber"
import axios from "axios"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"
import assert from "assert"

// TODO This only checks for the non-existence of relationships. It should actively delete them.
Given('there exists NO relationship between CAR MODEL {string} and any BRAND',
    async function (carModelLabel: string) {
        const carModel: CarModelNode = this.carmodel[carModelLabel]

        const response = await axios
            .get(`${process.env.API_URL}/car-models/${carModel.id}/belongs-to-brand`)
            .catch(error => {
                console.error(error)
            })

        if (!response) {
            assert.fail('Request failed');
        }

        assert.equal(
            response.data,
            '',
            'There are no relationships expected to exist')
    })
