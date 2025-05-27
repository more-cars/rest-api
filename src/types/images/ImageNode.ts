import {BaseNode} from "../BaseNode"
import {ImageNodeUserData} from "./ImageNodeUserData"
import {ImageNodeGeneratedData} from "./ImageNodeGeneratedData"

export type ImageNode = BaseNode & ImageNodeUserData & ImageNodeGeneratedData
