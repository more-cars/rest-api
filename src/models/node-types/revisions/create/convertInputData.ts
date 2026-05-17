import {RevisionInput} from "../types/RevisionInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: RevisionInput): DbInputData {
    return data
}
