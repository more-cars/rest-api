import {When, world} from "@cucumber/cucumber"
import {Brand} from "../../../../src/models/brands/Brand"
import {CarModel} from "../../../../src/models/car-models/CarModel"
import {Image} from "../../../../src/models/images/Image"
import FakeBrand from "../../../_toolbox/fixtures/nodes/FakeBrand"
import FakeCarModel from "../../../_toolbox/fixtures/nodes/FakeCarModel"
import FakeImage from "../../../_toolbox/fixtures/nodes/FakeImage"

When('the user creates a set of {int} {string}s',
    async (amount: number, nodeType: string) => {
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
        const response = {
            data: nodes
        }

        world.rememberResponse(response)
    })
