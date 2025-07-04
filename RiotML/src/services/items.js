import axios from "axios"


const CHAMPS_URL = 'https://ddragon.leagueoflegends.com/cdn/15.13.1/data/en_US/champion.json'
const data = await ServicioItems.getAll(CHAMPS_URL)

class ServicioItems {
    #service
    #imgBaseUrl
    ids

    constructor() {
        //Recordar que la URL depende de un versionado que habria que monitorear
        this.#imgBaseUrl = "https://ddragon.leagueoflegends.com/cdn/15.13.1/img/item/"
        this.#service = "a"
        //this.#data = 
        this.ids = this.processIds(data)

    }

    processIds = data => {
        return Object.keys(data)
    }

    getImg = async item => {
        return this.#imgBaseUrl + item + ".png"

    }

    static getAll = async url => {
        try {
            const { data } = await axios.get(url)
            console.log(Object.keys(data))
            return data
        }
        catch(error) {
            console.error("Error items GET", error)
        }
    }
}

export default ServicioItems