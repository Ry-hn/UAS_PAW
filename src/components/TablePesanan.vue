<template>
<v-main>
    <v-data-table :headers="headers" :items="pesanan" sort-by="name" class="elevation-1 pa-8" :search="golek">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>PESANAN</v-toolbar-title>
            </v-toolbar>
        </template>

        <template v-slot:[`item.gambar`]="{ item }">
            <div class="p-2">
                <v-img :src="item.gambar" style="width: 50px; height: 50px"></v-img>
            </div>
        </template>

        <template v-slot:[`item.totalHarga`]="{ item }">
            {{ item.harga_product * item.jumlah_pesan }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="hapusItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>

    <template>

    </template>

    <v-dialog v-model="dialogEdit" max-width="400px">
        <v-card>
            <v-card-title>Ubah Jumlah Pesan</v-card-title>
            <v-divider></v-divider>

            <v-container>
                <v-row no-gutters>
                    <v-col>
                        <v-card-title>{{editedItem.nama_product}}</v-card-title>
                    </v-col>
                    <v-col>
                        <v-text-field class="pa-3" suffix="pcs" type="number" v-model="editedItem.jumlah_pesan"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn>Cancel</v-btn>
                <v-btn @click="save(editedItem.idPesanan)">Save</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{error_message}} </v-snackbar>
</v-main>
</template>

<script>
export default {
    data() {
        return {
            snackbar: false,
            color: '',
            error_message: '',
            dialogEdit: false,
            golek: null,
            pesanan: [],
            headers: [{
                    align: 'start',
                    sortable: false,
                },
                {
                    text: 'ID Product',
                    value: 'id'
                },
                {
                    text: 'Nama Product',
                    value: 'nama_product'
                },
                {
                    text: 'Image',
                    value: 'gambar',
                    sortable: false,
                },
                {
                    text: 'Jumlah Beli',
                    value: 'jumlah_pesan'
                },
                {
                    text: 'Harga Product (Rp. )',
                    value: 'harga_product',
                },
                {
                    text: 'Total Harga (Rp. )',
                    value: 'totalHarga'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
            editedItem: {
                idPesanan: '',
                id: '',
                nama_product: '',
                gambar: '',
                jumlah_pesan: '',
                harga_product: ''
            }
        }
    },
    methods: {
        loadPesanan() {
            let url = this.$api + '/pesanan/' + localStorage.getItem('id');
            this.$http.get(url, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(response => {
                let data = response.data.pesanan;

                this.pesanan = data.map(function (obj) {
                    return {
                        idPesanan: obj.id_pesanan,
                        id: obj.id_product,
                        nama_product: obj.nama_product,
                        gambar: obj.gambar_product,
                        jumlah_pesan: obj.jumlah_pesan,
                        harga_product: obj.harga_product
                    }
                });

                console.table(this.pesanan);
            }).catch(e => {
                console.table(e);
            })
        },
        editItem(item) {

            this.editedItem = Object.assign({}, item);
            this.dialogEdit = true;
            console.log(item);
        },
        hapusItem(item) {
            let url = this.$api + '/pesanan/' + item.idPesanan;

            this.$http.delete(url)
                .then((response) => {
                    this.loadPesanan();
                    this.snackbar = true;
                    this.color = "green";
                    this.error_message = response.data.message;
                })
                .catch(e => {
                    this.snackbar = true;
                    this.color = "red";
                    this.error_message = e.response.data.message;
                })
        },
        save(idPesanan) {
            let url = this.$api + '/pesanan/' + idPesanan;

            this.$http.put(url, {
                    jumlah_pesan: this.editedItem.jumlah_pesan
                }).then((response) => {
                    this.loadPesanan();
                    this.dialogEdit = false;
                    this.snackbar = true;
                    this.color = "green";
                    this.error_message = response.data.message;
                })
                .catch(e => {
                    this.snackbar = true;
                    this.color = "red";
                    this.error_message = e.response.data.message;
                    console.table(e.response);
                })
        }
    },
    computed: {
        // totalHarga() {
        //     return 
        // }
    },
    mounted() {
        this.loadPesanan();
    }
}
</script>

<style>

</style>
