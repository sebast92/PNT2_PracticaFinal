import axios from "axios"


class ServicioProductos {
    #url

    constructor() {
        this.#url = 'https://682bc0f0d29df7a95be45855.mockapi.io/api/productos/'
    }

    getAll = async () => {
        try {
            const { data:productos } = await axios.get(this.#url)
            return productos
        }
        catch(error) {
            console.error("Error productos GET", error)
        }
    }

    post = async producto => {
        try {
            const { data:productoGuardado } = await axios.post(this.#url, producto)
            return productoGuardado
        }
        catch(error) {
            console.error("Error productos POST", error)

        }
    }

    put = async (id, producto) => {
        try {
            const { data:productoActualizado } = await axios.put(this.#url+id, producto)
            return productoActualizado
        }
        catch(error) {
            console.error("Error productos PUT", error)

        }
    }

    delete = async id => {
        try {
            const { data:productoEliminado } = await axios.delete(this.#url+id)
            return productoEliminado
        }
        catch(error) {
            console.error("Error productos DELETE", error)

        }
    }
}

export default ServicioProductos