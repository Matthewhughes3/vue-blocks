<template>
    <v-app id="app">
        <div
            v-if="user"
            style="background-color: black; position: fixed; top: 0px; z-index: 5; width: 100%"
        >
            <v-btn
                @click="$router.push({ name: 'dashboard' })"
                v-if="route_paths.includes($route.path)"
                >Dashboard</v-btn
            >
            <v-btn @click="$router.push({ path: '/' })" v-else
                >Back to Site</v-btn
            >
            <v-btn v-if="$route.query.edit" @click="save_changes"
                >Save Changes</v-btn
            >
            <v-btn v-if="$route.query.edit" @click="discard_changes"
                >Discard Changes</v-btn
            >
            <v-btn
                v-else-if="route_paths.includes($route.path)"
                @click="$router.push({ path: `${$route.fullPath}?edit=true` })"
                >Edit Page</v-btn
            >
            <v-btn style="float: right" @click="logout">Logout</v-btn>
        </div>
        <div :class="{ 'mt-9': user }">
            <div v-if="route_paths.includes($route.path)">
                <a
                    class="mr-2"
                    v-for="page in menu"
                    :key="page.name"
                    @click="$router.push({ path: page.path })"
                    >{{ page.name }}</a
                >
            </div>
            <router-view />
        </div>
        <v-card
            dark
            style="position: fixed; right: 0px; height: 100%; width: 300px; top: 30px"
            v-if="
                user && route_paths.includes($route.path) && $route.query.edit
            "
        >
            <div class="mt-5">
                <center>
                    <div v-for="element in elements" :key="element.name">
                        <v-btn @click="add_element(element)">{{
                            element.name
                        }}</v-btn>
                        <br />
                    </div>
                </center>
            </div>
        </v-card>
    </v-app>
</template>

<script>
import { docData } from "rxfire/firestore";
import { db, auth } from "./firebase";
import { mapState, mapGetters } from "vuex";

export default {
    data() {
        return {
            menu: []
        };
    },
    computed: {
        ...mapState(["user", "pages", "elements"]),
        ...mapGetters(["routes", "route_paths"])
    },
    methods: {
        logout() {
            auth.signOut();
        },
        add_element(element) {
            let path = this.$route.path;

            if (path == "/") {
                path = this.pages.filter(
                    page => page.uid == this.$route.name && page.path != "/"
                )[0].path;
            }

            const page = this.pages.filter(page => page.path == path)[0];

            page.data.push({
                element: element.element,
                value: element.name
            });
        },
        async discard_changes() {
            let path = this.$route.path;

            if (path == "/") {
                path = this.pages.filter(
                    page => page.uid == this.$route.name && page.path != "/"
                )[0].path;
            }

            const page = await db
                .collection("pages")
                .doc(this.$route.name)
                .get();
            const local_page = this.pages.filter(page => page.path == path)[0];

            local_page.data = page.data().data;

            this.$router.push({ path: this.$route.path });
        },
        async save_changes() {
            let path = this.$route.path;

            if (path == "/") {
                path = this.pages.filter(
                    page => page.uid == this.$route.name && page.path != "/"
                )[0].path;
            }

            const local_page = this.pages.filter(page => page.path == path)[0];

            for (const data of local_page.data) {
                delete data.edit;
                delete data.delete;
            }

            const page_ref = await db
                .collection("pages")
                .doc(local_page.uid)
                .get();
            const page = page_ref.data();
            page.uid = page_ref.id;

            if (
                !local_page.data.every((data, idx) =>
                    Object.values(data).every(
                        (value, idx2) =>
                            page.data[idx] &&
                            value == Object.values(page.data[idx])[idx2]
                    )
                ) ||
                page.uid != local_page.uid ||
                page.path != local_page.path
            ) {
                const uid = local_page.uid;

                delete local_page.uid;

                await db
                    .collection("pages")
                    .doc(uid)
                    .update(local_page);
            }
            this.$router.push({ path: this.$route.path });
        }
    },
    watch: {
        routes() {
            this.$router.addRoutes(this.routes);
        }
    },
    created() {
        docData(db.collection("settings").doc("defaults")).subscribe(
            defaults => {
                if (defaults.menu) {
                    docData(
                        db.collection("menus").doc(defaults.menu)
                    ).subscribe(menu => {
                        this.menu = menu.pages;
                    });
                }
            }
        );
    }
};
</script>

<style>
.close:hover {
    cursor: pointer;
    color: red;
}
.pointer:hover {
    cursor: pointer;
}
</style>
