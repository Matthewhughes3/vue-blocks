<template>
    <div>
        <h1>Dashboard</h1>
        <v-btn @click="$router.push({ name: 'pages' })">Pages</v-btn>
        <br />
        <v-btn @click="$router.push({ name: 'menus' })">Menus</v-btn>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
