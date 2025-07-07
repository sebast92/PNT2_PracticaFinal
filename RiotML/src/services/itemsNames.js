import axios from "axios"

//const data = await ServicioChampions.getAll(CHAMPS_URL)

const getAllIdsAndNames = async () => {
        try {
            const ITEMS_URL = "https://ddragon.leagueoflegends.com/cdn/15.13.1/data/en_US/item.json"
            const { data } = await axios.get(ITEMS_URL)
            let return_value = {}
            for (let key in data["data"]) {
                //return_value.push({key: data["data"][key]["name"]})
                return_value[key] = data["data"][key]["name"]
            }
            //console.log(Object.keys(data))
            //console.log(data["data"]["Aatrox"])
            //console.log(names)
            
            return return_value
        }
        catch(error) {
            console.error("Error champions GET", error)
        }
    }


//const names = await getAllNames()
//console.log(names)
console.log("exporting")
export default getAllIdsAndNames