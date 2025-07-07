import axios from "axios"

class ServicioChampions {
    #champsUrl
    #imgBaseUrl
    #serviceUrl
    //names

    constructor() {
        //console.log(names)
        //Recordar que la URL depende de un versionado que habria que monitorear
        this.#imgBaseUrl = "https://ddragon.leagueoflegends.com/cdn/15.13.1/img"
        this.#champsUrl = 'https://ddragon.leagueoflegends.com/cdn/15.13.1/data/en_US/champion.json'
        this.#serviceUrl = "localhost 8080"
        //this.names = names

    }

    getChampImg = champ => {
       // const img = await axios.get(`${this.#imgBaseUrl}/${champ}.png`) 
        return `${this.#imgBaseUrl}/champion/${champ}.png`
    }

    getAllNames = async () => {
        try {
            const { data } = await axios.get(this.#champsUrl)
            let names = []
            for (let key in data["data"]) {
                names.push(key)
            }
            //console.log(Object.keys(data))
            //console.log(data["data"]["Aatrox"])
            //console.log(names)
            return names
        }
        catch(error) {
            console.error("Error champions GET", error)
        }
    }

    post = async teams => {
        try {
            const { data: teamsGuardados } = await axios.post(this.#serviceUrl, teams)
            return teamsGuardados
        }
        catch(error) {
            console.error("Error productos POST", error)

        }
    }
}



export default ServicioChampions