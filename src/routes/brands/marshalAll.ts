import {BrandNode} from "../../types/BrandNode"
import {marshal} from "./marshal"

/**
 * Creates a valid response object from the given collection of brands.
 */
export function marshalAll(brands: Array<BrandNode>) {
    const responseObjects: any[] = []

    brands.forEach((brand: BrandNode) => {
        responseObjects.push(marshal(brand))
    })

    return responseObjects
}
