import axios from "axios"

class ServicioTeam {
    #serviceUrl
    //names

    constructor() {
        this.#serviceUrl = "http://localhost:8080/api/teams"
        //this.names = names
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

export default ServicioTeam