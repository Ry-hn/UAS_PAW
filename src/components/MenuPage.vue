<template>
<v-container grid-list-md>
    <v-layout col wrap>
        <v-flex style="width: 25%; " v-for="(product, index) in products" :key="index">
           
            <v-card class="mx-auto my-12" max-width="374">
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>

                <v-img height="250" contain :src="product.gambar_product"></v-img>

                <v-card-title>{{product.nama_product}}</v-card-title>
                <v-card-title style="margin-top:-40px">Rp. {{product.harga_product}}</v-card-title>
                <v-card-text>
                    <div>{{product.deskripsi_product}}</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-text-field label="Jumlah"  type="number" v-model="jumlah[index]"></v-text-field>
                    <v-btn color="deep-purple lighten-2" text @click="add(index, product.id)">
                        ADD
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            jumlah: [],
        };
    },
    methods: {
        init() {
            var url = this.$api + '/product';
            this.$http.get(url)
                .then(response => {
                    this.products = response.data.data;
                    console.table(this.products);
                });
        },
        add(index, id) {
            console.log(`index: ${index} jumlah: ${this.jumlah[index]} idProd: ${id}`);
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<style>

</style>
