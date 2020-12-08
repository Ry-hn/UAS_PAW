<template>
<v-app>
    <v-toolbar class="mainHeader" max-height="60px">
        <v-toolbar-title style="font-size:32px">
            <a style="text-decoration: none;" href="/">La Vearte</a>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon href="/tablePesanan">
            <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
                <v-avatar v-on="on" icon x-large>
                    <img :src="url" alt="">
                </v-avatar>
            </template>
            <v-card class="mx-auto" width="300px" outlined padding="50px">

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
            url: '',
        };
    },
    methods: {
        profile() {
            if (!localStorage.getItem('id'))
                this.$router.push('/login');
            else
                this.$router.push('/profile');
        },
        logout() {
            if (localStorage.getItem('id') && localStorage.getItem('token')) {
                localStorage.removeItem('id');
                localStorage.removeItem('token');
                localStorage.removeItem('profileImg');
                location.reload();
            }
        },
        loadUrl() {

            this.url = localStorage.getItem('profileImg') ? this.$api + '/user/image/' + localStorage.getItem('profileImg') :
                'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png';
        },
    },
    mounted() {
        this.loadUrl();
    }

}
</script>

<style>

</style>
