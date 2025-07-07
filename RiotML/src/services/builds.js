import axios from "axios"


class ServicioBuilds {
    #serviceUrl
    //names

    constructor() {
        //console.log(names)
        //Recordar que la URL depende de un versionado que habria que monitorear
        this.#serviceUrl = "http://localhost:8080/api/builds"
        //this.names = names

    }

    post = async build => {
        try {
            const { data: buildGuardada } = await axios.post(this.#serviceUrl, build)
            return buildGuardada
        }
        catch(error) {
            console.error("Error productos POST", error)
        }
    }
}

export default ServicioBuilds