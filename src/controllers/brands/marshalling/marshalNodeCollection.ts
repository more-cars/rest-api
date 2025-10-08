import {BrandNode} from "../../../models/brands/types/BrandNode"
import {marshalNode} from "./marshalNode"
import {BrandResponse} from "../types/BrandResponse"

export function marshalNodeCollection(brands: Array<BrandNode>): Array<BrandResponse> {
    const responseObjects: Array<BrandResponse> = []

    brands.forEach((brand: BrandNode) => {
        responseObjects.push(marshalNode(brand))
    })

    return responseObjects
}
