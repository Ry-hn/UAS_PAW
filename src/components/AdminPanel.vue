<template>
<v-main>

    <h1 class="text-center justify-center py-6 font-weight-bold display-3 basil--text">
        PANEL ADMIN
    </h1>

    <v-tabs v-model="tab" background-color="transparent" color="red" grow>
        <v-tab v-for="item in items" :key="item">
            {{ item }}
        </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in items" :key="item">
            <v-card flat>
                <v-data-table :headers="headers[index]" :items="TableData[index]" sort-by="name" class="elevation-1 pa-8" :search="golek">

                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-spacer></v-spacer>

                            <v-btn color="primary" dark class="mb-2" v-if="item === 'PRODUK' " @click="dialogAdd = true">
                                New {{item}}
                            </v-btn>

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
            </v-card>

            <v-dialog v-model="dialogAdd">
                <v-card>
                    <v-card-title>TAMBAH PRODUK</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="formProduct.nama_product" label="Nama Product"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="formProduct.deskripsi_product" label="DeskripsiProduct"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="formProduct.harga_product" label="Harga Product"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="formProduct.gambar_product" label="URL Gambar"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="tambahProduk">Tambahkan</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogEdit">
                <v-card>
                    <v-card-title>EDIT PRODUK</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedProduk.nama_product" label="Nama Product"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedProduk.deskripsi_product" label="DeskripsiProduct"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedProduk.harga_product" label="Harga Product"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedProduk.gambar_product" label="URL Gambar"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="editProduct">SAVE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-tab-item>
    </v-tabs-items>

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
            tab: 1,
            items: [
                'USER', 'PRODUK', 'PESANAN',
            ],
            dialogAdd: false,
            dialogEdit: false,
            golek: null,
            pesanan: [],
            Users: [],
            Produk: [],
            TableData: [],
            headers: [
                [{ // TAB USER
                        align: 'start',
                        sortable: false,
                    },
                    {
                        text: 'ID USER',
                        value: 'id'
                    },
                    {
                        text: 'EMAIL',
                        value: 'email',
                    },
                    {
                        text: 'ROLE',
                        value: 'role',
                    },
                    {
                        text: 'NAMA USER',
                        value: 'nama_user'
                    },
                    {
                        text: 'TELEPON',
                        value: 'telepon'
                    },
                    {
                        text: 'VERIFIED AT',
                        value: 'email_verified_at'
                    }
                ],
                [{ // TAB PRODUK
                        align: 'start',
                        sortable: false,
                    },
                    {
                        text: 'ID PRODUK',
                        value: 'id'
                    },
                    {
                        text: 'NAMA PRODUK',
                        value: 'nama_product'
                    },
                    {
                        text: 'DESKRIPSI PRODUK',
                        value: 'deskripsi_product'
                    },
                    {
                        text: 'HARGA PRODUK',
                        value: 'harga_product'
                    },
                    {
                        text: 'Actions',
                        value: 'actions',
                        sortable: false
                    }
                ],
                [{ // TAB PESANAN
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
            ],
            editedProduk: {
                id: '',
                nama_product: '',
                deskripsi_product: '',
                harga_product: '',
                gambar_product: '',
            },
            formProduct: {
                nama_product: '',
                deskripsi_product: '',
                harga_product: '',
                gambar_product: '',
            },
        }
    },
    methods: {
        loadDataUser() {
            let url = this.$api + '/user/all';
            this.$http.get(url)
                .then(response => {
                    let data = response.data.data;

                    this.Users = data.map(function (obj) {
                        return {
                            id: obj.id,
                            email: obj.email,
                            nama_user: obj.nama_user,
                            telepon: obj.telepon,
                            role: obj.role,
                            email_verified_at: obj.email_verified_at
                        }
                    });
                    this.TableData[0] = this.Users;
                }).catch(e => {
                    console.log(e);
                })
        },
        loadDataProduct() {
            let url = this.$api + '/product';
            this.$http.get(url)
                .then(response => {
                    let data = response.data.data;

                    this.Produk = data.map(function (obj) {
                        return {
                            id: obj.id,
                            nama_product: obj.nama_product,
                            deskripsi_product: obj.deskripsi_product,
                            harga_product: obj.harga_product,
                            gambar_product: obj.gambar_product
                        }
                    });
                    this.TableData[1] = this.Produk;
                }).catch(e => {
                    console.log(e);
                })

        },
        loadDataPesanan() {

        },
        someMethod() {
            console.table(this.tab);
        },
        hapusItem(row) {
            let url = this.$api + '/product/' + row.id;

            console.log(url);

            this.$http.delete(url)
                .then(() => {
                    this.loadDataProduct();
                    this.snackbar = true;
                    this.color = "green";
                    this.error_message = "Delete Produk Berhasil";
                })
                .catch(() => {
                    this.snackbar = true;
                    this.color = "red";
                    this.error_message = "Delete Produk Gagal ";
                })
        },
        tambahProduk() {
            let url = this.$api + '/product';

            this.$http.post(url, this.formProduct)
                .then((response) => {
                    this.loadDataProduct();

                    this.snackbar = true;
                    this.color = "green";
                    this.error_message = response.data.message;
                })
                .catch((e) => {
                    this.snackbar = true;
                    this.color = "red";
                    this.error_message = e.response.data.message;
                });

            this.dialogAdd = false;
        },
        editItem(item) {
            this.dialogEdit = true;
            this.editedProduk = Object.assign({}, item);
        },
        editProduct() {
            let url = this.$api + '/product/' +  this.editedProduk.id;

            this.$http.put(url, this.editedProduk)
                .then( (response) => {
                    this.loadDataProduct();
                    this.snackbar = true;
                    this.color = "green";
                    this.error_message = response.data.message;
                })
                .catch( e => {
                    this.snackbar = true;
                    this.color = "red";
                    this.error_message = e.response.data.message;
                    console.log(e);
                })
            
            this.dialogEdit = false;
        }
    },
    mounted() {
        this.loadDataUser();
        this.loadDataProduct();
        this.loadDataPesanan();

    }
}
</script>

<style>

</style>
