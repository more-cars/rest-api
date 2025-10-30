import {CreateCarModelVariantInput} from "./types/CreateCarModelVariantInput"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/car-model-variants/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/car-model-variants/getNodeById"

export class CarModelVariant {
    static async create(data: CreateCarModelVariantInput): Promise<CarModelVariantNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | CarModelVariantNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }
}
