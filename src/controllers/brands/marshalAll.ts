import {BrandNode} from "../../models/brands/types/BrandNode"
import {marshal} from "./marshal"
import {BrandResponse} from "./types/BrandResponse"

/**
 * Creates a valid response object from the given collection of brands.
 */
export function marshalAll(brands: Array<BrandNode>): Array<BrandResponse> {
    const responseObjects: Array<BrandResponse> = []

    brands.forEach((brand: BrandNode) => {
        responseObjects.push(marshal(brand))
    })

    return responseObjects
}
