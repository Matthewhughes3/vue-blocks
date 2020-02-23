<template>
    <div v-if="page.data.length > 0">
        <div v-if="$route.query.edit && user">
            <div v-for="(element, idx) in page.data" :key="element.value">
                <v-text-field
                    v-model="element.value"
                    v-if="element.edit"
                    @focusout="$set(element, 'edit', false)"
                />
                <v-container
                    v-else
                    @mouseover="$set(element, 'delete', true)"
                    @mouseleave="$set(element, 'delete', false)"
                >
                    <v-row v-if="idx > 0">
                        <v-col>
                            <v-icon class="pointer" @click="move_up(idx)"
                                >mdi-arrow-up-bold</v-icon
                            >
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <tag
                                :is="element.element"
                                @click="$set(element, 'edit', true)"
                                >{{ element.value }}</tag
                            >
                        </v-col>
                        <v-col>
                            <span
                                v-if="element.delete"
                                class="close"
                                @click="remove_element(element)"
                                >X</span
                            >
                        </v-col>
                    </v-row>
                    <v-row v-if="idx < page.data.length - 1">
                        <v-col>
                            <v-icon class="pointer" @click="move_down(idx)"
                                >mdi-arrow-down-bold</v-icon
                            >
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
        <div v-else>
            <tag
                v-for="element in page.data"
                :key="element.value"
                :is="element.element"
                >{{ element.value }}</tag
            >
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

Vue.component("tag", {
    props: {
        is: { type: String, required: true }
    },
    render(h) {
        return h(this.tag, this.$slots.default);
    }
});

export default {
    computed: {
        ...mapState(["pages", "user"]),
        ...mapGetters(["routes"]),
        page() {
            if (this.pages) {
                return this.pages.filter(
                    page => page.uid == this.$route.name
                )[0];
            } else {
                return null;
            }
        }
    },
    methods: {
        move_up(idx) {
            const element_copy = this.page.data[idx];
            this.page.data[idx] = this.page.data[idx - 1];
            this.page.data[idx - 1] = element_copy;
        },
        move_down(idx) {
            const element_copy = this.page.data[idx];
            this.page.data[idx] = this.page.data[idx + 1];
            this.page.data[idx + 1] = element_copy;
        },
        remove_element(element) {
            let path = this.$route.path;

            if (path == "/") {
                path = this.pages.filter(
                    page => page.uid == this.$route.name && page.path != "/"
                )[0].path;
            }

            const page = this.pages.filter(page => page.path == path)[0];

            const index = page.data.indexOf(element);
            page.data.splice(index, 1);
        }
    },
    watch: {
        routes() {
            const index = this.routes.filter(route => route.path == "/")[0];
            if (index && index.name == this.$route.name) {
                this.$router.push({ path: "/" });
            }
        }
    }
};
</script>

<style></style>
