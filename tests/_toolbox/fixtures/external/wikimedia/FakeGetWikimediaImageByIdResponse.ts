import type {WikimediaImageItem} from "../../../../../src/db/external/wikimedia/types/WikimediaImageItem"

export const FakeGetWikimediaImageByIdResponse = {
    query: {
        pageids: [1234],
        pages: {
            1234: {
                imageinfo: [{
                    user: 'Morio',
                    width: 2560,
                    height: 1706,
                    thumburl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Sheldon_van_der_Linde_2019_DTM_Hockenheim_%28May%29_FP2_3.jpg/120px-Sheldon_van_der_Linde_2019_DTM_Hockenheim_%28May%29_FP2_3.jpg',
                    thumbwidth: 120,
                    thumbheight: 80,
                    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Sheldon_van_der_Linde_2019_DTM_Hockenheim_%28May%29_FP2_3.jpg',
                    descriptionurl: 'https://commons.wikimedia.org/wiki/File:Sheldon_van_der_Linde_2019_DTM_Hockenheim_(May)_FP2_3.jpg',
                    mediatype: 'BITMAP',
                    extmetadata: {
                        ObjectName: {
                            value: 'Sheldon van der Linde 2019 DTM Hockenheim (May) FP2 3',
                        },
                        ImageDescription: {
                            value: '<b>2019 DTM Hockenheimring (May)</b>: BMW M4 Turbo DTM of Sheldon van der Linde',
                        },
                        LicenseShortName: {
                            value: 'CC BY-SA 4.0',
                        },
                    },
                } satisfies WikimediaImageItem]
            },
        },
    },
}
