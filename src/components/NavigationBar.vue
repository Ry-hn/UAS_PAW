<template>
<v-app>
    <v-toolbar class="mainHeader" max-height="60px" >
        <v-toolbar-title style="font-size:32px">
            La Vearte
        </v-toolbar-title>

    
        <v-spacer></v-spacer>

        <v-btn icon href="/shoppingcart">
            <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon>
                    <v-icon>mdi-account-circle</v-icon>
                </v-btn>
            </template>
            <v-card class="mx-auto" max-width="200px" outlined padding="50px">

                <v-list-item @click="profile">
                    <v-list-item-title>
                        My Profile
                    </v-list-item-title>
                </v-list-item>

                <v-list-item @click="logout">
                    <v-list-item-title>
                        Logout
                    </v-list-item-title>
                </v-list-item>
            </v-card>
        </v-menu>
    </v-toolbar>
    <router-view />
</v-app>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        profile() {
            if(!localStorage.getItem('id')) 
                this.$router.push('/login');
            else
                this.$router.push('/profile');
        }
    }
}
</script>

<style>

</style>
