import { createRouter, createWebHistory } from "vue-router";

import ChampionsSelection from "./components/ChampionsSelection.vue";
import ItemsBuilder from "./components/ItemsBuilder.vue";

const routes = [
    /* ---- definición de la ruta raíz ---- */
    //{ path: '/', component: Binding },
    { path: '/', redirect: '/champsSelection' },

    /* ---- definición de las rutas activas ---- */
    { path: '/champsSelection', component: ChampionsSelection},
    { path: '/itemsSelection', component: ItemsBuilder},


    /* ---- definición de las rutas no existentes (por default) ---- */
    //{ path: '/:pathmatch(.*)*', redirect: '/champsSelection' },
]

const router = createRouter({
    history: createWebHistory(),
    routes      // es igual a -> routes: routes
})

export default router