import {When} from "@cucumber/cucumber"
import {Brand} from "../../../src/models/Brand"
import {CarModel} from "../../../src/models/CarModel"
import {Image} from "../../../src/models/Image"
import FakeBrand from "../../fixtures/nodes/FakeBrand"
import FakeCarModel from "../../fixtures/nodes/FakeCarModel"
import FakeImage from "../../fixtures/nodes/FakeImage"

When('the user creates a set of {int} {string}s',
    async function (amount: number, nodeType: string) {
        const nodes = []

        for (let i = 0; i < amount; i++) {
            switch (nodeType.toLowerCase()) {
                case 'brand':
                    nodes.push(await Brand.create(FakeBrand))
                    break
                case 'car model':
                    nodes.push(await CarModel.create(FakeCarModel))
                    break
                case 'image':
                    nodes.push(await Image.create(FakeImage))
                    break
            }
        }
        this.latestResponse = {
            data: nodes
        }
    })
