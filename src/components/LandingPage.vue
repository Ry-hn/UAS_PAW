<template>
<v-container class="fill-height" fluid>
    <div class="title">
        <p class="head" style="font-family:redressed, 'sans-serif'">La Vearte</p>
        <p class="sub">Since 1995</p>

        <v-chip-group style="margin-left:290px; margin-top:50px">
            <v-chip style="opacity:80%;" class="white" @click="metu">Click Kene Dab</v-chip>
            <v-chip v-model="showMap">Find US</v-chip>
        </v-chip-group>

    </div>

    <v-container v-if="showMap" class="footer" style="">
        <v-layout flex align-center justify-center>
            <v-card outlined>
                <v-card-title>Find Us</v-card-title>
                <iframe src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJRSsv-_FZei4R3ZzH6S9umCA&key=AIzaSyAZ3pToe9rHdL-4KuX5vdthWBxunbZn7MU" width="780" height="520" v frameborder="0" style="border: 0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                <v-card-text class="pt-4"> </v-card-text>
            </v-card>
        </v-layout>
    </v-container>

</v-container>
</template>

<script>
export default {

    data() {
        return {
            showMap: false,
        }
    },
    methods: {
        metu() {
            this.$router.push("/");
        }
    }
}
</script>

<style>
.fill-height {
    background-image: url('../assets/blur.jpg');
}

.title {
    margin: auto;
    color: white;
}

.head {
    font-size: 200px;
    font-family: redressed, 'sans-serif';
}

.sub {
    margin-top: 100px;
    text-align: center;
    font-family: redressed, 'sans-serif';
    font-size: 64px;
}

.footer {
    position: relative;
    text-align: center;
    bottom: 0px;
    width: 100%;
}
</style>
