import {CreateCarModelVariantInput} from "./types/CreateCarModelVariantInput"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/car-model-variants/createNode"
import {convertOutputData} from "./create/convertOutputData"

export class CarModelVariant {
    static async create(data: CreateCarModelVariantInput): Promise<CarModelVariantNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }
}
