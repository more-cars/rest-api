export function isValidBodyStyle(value: unknown) {
    if (value === null) {
        return true
    }

    if (value === undefined) {
        return true
    }

    if (typeof value !== "string") {
        return false
    }

    if (![
        "coupe",
        "convertible",
        "roadster",
        "hatchback",
        "sedan",
        "station-wagon",
        "minivan",
        "van",
        "suv",
        "off-roader",
        "pickup-truck",
        "truck",
        "targa",
        "t-top",
        "kei-car",
        "formula-race-car",
        "other",
    ].includes(value)) {
        return false
    }

    return true
}
