<template>
  <v-container class="fill-height" fluid>   
      <div class="title">
          <p class="head" style="font-family:redressed, 'sans-serif'">La Vearte</p>
          <p class="sub">Since 1995</p>

          <v-chip-group style="margin-left:290px; margin-top:50px">
              <v-chip style="opacity:80%;" class="white" @click="metu">Click Kene Dab</v-chip>
          </v-chip-group>
      </div>
  </v-container>
</template>

<script>
export default {
    methods: {
        metu() {
            this.$router.push("/");
        }
    }
}
</script>

<style>
    
    .fill-height {
        overflow-y: hidden;
        background-image: url('../assets/blur.jpg');
    }
    
    .title {
        margin: auto;
        color: white;
    }

    .head {
        font-size: 200px;
        font-family:redressed, 'sans-serif';
    }
    
    .sub {
        margin-top: 100px;
        text-align: center;
        font-family:redressed, 'sans-serif';
        font-size:64px;
    }

</style>