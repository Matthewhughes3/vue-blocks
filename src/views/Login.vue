<template>
    <div>
        <center>
            <v-card style="width: 50%">
                <h2>Login</h2>
                <span style="color: red">{{ msg }}</span>
                <v-text-field
                    @keyup.enter="login"
                    placeholder="Username"
                    v-model="username"
                />
                <v-text-field
                    @keyup.enter="login"
                    placeholder="Password"
                    type="password"
                    v-model="password"
                />
                <v-btn @click="login">Login</v-btn>
            </v-card>
        </center>
    </div>
</template>

<script>
import { auth } from "../firebase";

export default {
    data() {
        return {
            username: null,
            password: null,
            msg: null
        };
    },
    methods: {
        login() {
            auth.signInWithEmailAndPassword(this.username, this.password)
                .then(user => {
                    this.$router.push("/");
                })
                .catch(err => {
                    this.msg = "Incorrect Username or Password";
                    this.username = null;
                    this.password = null;
                });
        }
    }
};
</script>

<style></style>
