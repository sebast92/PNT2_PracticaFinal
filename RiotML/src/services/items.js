import axios from "axios"

class ServicioItems {
    #imgBaseUrl
    #itemsUrl
    #service

    constructor() {
        //console.log(names)
        //Recordar que la URL depende de un versionado que habria que monitorear
        this.#imgBaseUrl = "https://ddragon.leagueoflegends.com/cdn/15.13.1/img"
        this.#itemsUrl = "https://ddragon.leagueoflegends.com/cdn/15.13.1/data/en_US/item.json"
        //this.names = names
        this.#service = "http://localhost:8080/api/items"
    }

    getItemImg = item => {
       // const img = await axios.get(`${this.#imgBaseUrl}/${champ}.png`) 
        return `${this.#imgBaseUrl}/item/${item}.png`
    }

    getAllIdsAndNames = async () => {
        try {
            const { data } = await axios.get(this.#itemsUrl)
            let names = []
            let ids = []
            for (let key in data["data"]) {
                ids.push(key)
                names.push(data["data"][key]["name"])
            }
            //console.log(Object.keys(data))
            //console.log(data["data"]["Aatrox"])
            //console.log(names)
            let return_value = []
            return_value.push(ids)
            return_value.push(names)
            return return_value
        }
        catch(error) {
            console.error("Error champions GET", error)
        }
    }

    getItem = async () => {
        let idsNames = await this.getAllIdsAndNames()
        let ids = idsNames[0]
        console.log("ServicioItems")
        console.log(idsNames)
        console.log(ids)
        let idx = Math.floor(Math.random() * ids.length)
        console.log(idx)
        let random_id = ids[idx]
        console.log(random_id)
        return random_id
    }
}


export default ServicioItems