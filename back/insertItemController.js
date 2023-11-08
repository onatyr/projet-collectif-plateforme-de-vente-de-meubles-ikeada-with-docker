import { supabaseAd } from "./app.js"

export const checkArchived = (itemData) => {
    if (itemData.archived) {
        return { error: { message: "Interdit : les items ne peuvent pas être créés et archivés en même temps" }, status: 403 }
    } else {
        return "validé"
    }
}

export const insertItem = async (itemData) => {
    const { data, error } = await supabaseAd.from("ITEM").insert([itemData]).select()

    if (error) {
        return error
    } else {
        return data
    }
}

export const addItemColors = async (colorIds, itemId) => {
    const { data, error } = await supabaseAd.from("ITEM_COLOR")
        .upsert([{ item_id: itemId, color_id: colorIds[0] }, { item_id: itemId, color_id: colorIds[1] }]).select()
    if (error) {
        return error
    } else {
        return data
    }
}
// CREATION
export const postItem = async (req, res) => {
    const jsonData = req.body;
    const itemData = jsonData.item
    const colorsData = jsonData.colors.ids

    const resArchived = checkArchived(itemData)
    const resItem = await insertItem(itemData)
    console.log(resItem)
    const resColors = await addItemColors(colorsData, resItem[0].id)

    return res
        .send(`Validité des données : ${resArchived}, création de l'item : ${resItem}, ajout des couleurs : ${resColors}`)
}

