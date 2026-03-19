import {CreateModelCarBrandInput} from "../types/CreateModelCarBrandInput"
import {InputModelCarBrandCreate} from "../../../../db/node-types/model-car-brands/types/InputModelCarBrandCreate"

export function convertInputData(data: CreateModelCarBrandInput): InputModelCarBrandCreate {
    return {
        name: data.name,
        founded: data.founded,
        defunct: data.defunct,
    } satisfies InputModelCarBrandCreate
}
