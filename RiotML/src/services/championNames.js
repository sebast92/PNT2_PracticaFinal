import axios from "axios"

//const data = await ServicioChampions.getAll(CHAMPS_URL)

const getAllNames = async () => {
        try {
            const CHAMPS_URL = 'https://ddragon.leagueoflegends.com/cdn/15.13.1/data/en_US/champion.json'
            const { data } = await axios.get(CHAMPS_URL)
            let names = []
            for (let key in data["data"]) {
                names.push(key)
            }
            //console.log(Object.keys(data))
            //console.log(data["data"]["Aatrox"])
            console.log(names)
            return names
        }
        catch(error) {
            console.error("Error champions GET", error)
        }
    }

//const names = await getAllNames()
//console.log(names)
console.log("exporting")
export default getAllNames