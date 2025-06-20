import {CreateBrandInput} from "../types/CreateBrandInput"
import {InputBrandCreate} from "../../../db/nodes/brands/types/InputBrandCreate"

export function convertInputData(data: CreateBrandInput): InputBrandCreate {
    const convertedData: InputBrandCreate = {
        name: data.name,
        full_name: data.full_name,
        founded: data.founded,
        defunct: data.defunct,
        wmi: data.wmi,
        hsn: data.hsn,
    }

    return convertedData
}
