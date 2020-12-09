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
                    <v-btn color="deep-purple lighten-2" :disabled="isDisabled" text @click="add(index, product.id)">
                        ADD
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{error_message}} </v-snackbar>

</v-container>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            jumlah: [],
            snackbar:false,
            color: '',
            error_message: '',
        };
    },
    methods: {
        init() {
            let url = this.$api + '/product';
            this.$http.get(url)
                .then(response => {
                    this.products = response.data.data;
                    console.table(this.products);
                });
        },
        add(index, id) {
            let url = this.$api + '/pesanan';
        
            let formData = {
                id_product: id,
                id_user: localStorage.getItem('id'),
                jumlah_pesan: this.jumlah[index]
            };

            this.$http.post(url, formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then( response => {
                this.snackbar = true;
                this.color = 'green';
                this.error_message = response.data.message;

                console.table(response);
            } ).catch( e => {
                this.snackbar = true;
                this.color = 'red';
                this.error_message = e.response.data.message;

                console.table(e);
            })

            this.jumlah[index] = '';
        },
        resetSnackBar() {
            this.snackbar = false;
            this.color = '';
            this.error_message= '';
        },
        
    },
    computed: {
        isDisabled() {
            return localStorage.getItem('token') === null;
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<style>

</style>
