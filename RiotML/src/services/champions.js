//import names from './championNames'

//const data = await ServicioChampions.getAll(CHAMPS_URL)

console.log("names en champions")
//console.log(names)

class ServicioChampions {
    #champsUrl
    #imgBaseUrl
    //names

    constructor() {
        console.log(names)
        //Recordar que la URL depende de un versionado que habria que monitorear
        this.#imgBaseUrl = "https://ddragon.leagueoflegends.com/cdn/15.13.1/img/champion/"
        this.#champsUrl = 'https://ddragon.leagueoflegends.com/cdn/15.13.1/data/en_US/champion.json'
        //this.#service = "a"
        //this.names = names

    }

    getImg = async champ => {
        return `${this.#imgBaseUrl} + ${champ} + .png`
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
}



export default ServicioChampions