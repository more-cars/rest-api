import {describe, expect, test} from "vitest"
import {FakeGetWikimediaImageByIdResponse} from "../../../../_toolbox/fixtures/external/wikimedia/FakeGetWikimediaImageByIdResponse"
import {convertWikimediaImageItemToImageInput} from "../../../../../src/db/external/wikimedia/convertWikimediaImageItemToImageInput"

describe('URLs for the Wikimedia thumbnail image are correctly assembled', () => {
    test('for a 2560 pixel wide photo', async () => {
        const convertedImage = convertWikimediaImageItemToImageInput(FakeGetWikimediaImageByIdResponse.query.pages["1234"].imageinfo[0], 120)

        expect(convertedImage.image_url_xs?.includes('/120px-'), `"120px" not found in URL ${convertedImage.image_url_xs}`)
            .toBe(true)

        expect(convertedImage.image_url_s?.includes('/330px-'), `"330px" not found in URL ${convertedImage.image_url_s}`)
            .toBe(true)

        expect(convertedImage.image_url_m?.includes('/500px-'), `"500px" not found in URL ${convertedImage.image_url_m}`)
            .toBe(true)

        expect(convertedImage.image_url_l?.includes('/1280px-'), `"1280px" not found in URL ${convertedImage.image_url_m}`)
            .toBe(true)

        expect(convertedImage.image_url_xl?.includes('/1920px-'), `"1920px" not found in URL ${convertedImage.image_url_xl}`)
            .toBe(true)

        expect(convertedImage.image_url_xxl)
            .toBe(null)
    })
})
