<template>
<v-main>
    <v-row class="my-12 mx-16">
        <v-col>
            <v-card class="mx-16" width="400px">
                <v-row>
                    <v-card-title>
                        <img class="ml-5" height="100" width="100" style="border-radius:100%" :src="profileImg" />
                        <label for="fileinput" style="margin-top:80px; margin-left:100px; z-index:1; position:absolute;">
                            <v-icon>{{icon.plusCircle}}</v-icon>
                        </label>
                        <input hidden id="fileinput" type="file" accept="image/*" @change="onChange" />
                    </v-card-title>

                    <v-col>
                        <v-card-title>
                            <span> {{ user.nama }} </span>
                        </v-card-title>
                        <v-chip class="ml-4">{{user.role}}</v-chip>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-card-text class="ml-4">
                        <p>
                            <v-icon>{{icon.email}}</v-icon> {{ user.email }}
                        </p>
                        <p>
                            <v-icon>{{icon.phone}}</v-icon> {{ user.phone }}
                        </p>
                    </v-card-text>
                </v-row>
            </v-card>

            <!-- anjay mabar -->
            <v-btn v-if="user.role == 'ADMIN'" class="my-12 mx-16" width="400px" color="blue" href="/paneladmin"> PANEL ADMIN </v-btn>

        </v-col>

        <v-card style="margin-right:350px" width="600px">
            <v-card-title>Personal Information</v-card-title>
            <v-card-text>

                <v-row class="ml-16">
                    <v-col>
                        <v-card-text>Name</v-card-text>
                    </v-col>
                    <v-text-field style="margin-right:10rem; margin-top:10px" v-model="formProfile.nama_user"></v-text-field>
                </v-row>

                <v-row class="ml-16">
                    <v-col>
                        <v-card-text>Email</v-card-text>
                    </v-col>
                    <v-text-field :disabled="true" style="margin-right:10rem; margin-top:10px" v-model="formProfile.email"></v-text-field>
                </v-row>

                <v-row class="ml-16">
                    <v-col>
                        <v-card-text>Phone Number</v-card-text>
                    </v-col>
                    <v-text-field type="number" style="margin-right:10rem; margin-top:10px" v-model="formProfile.telepon"></v-text-field>
                </v-row>
            </v-card-text>

            <v-card-title>Change Password</v-card-title>
            <v-card-text>
                <v-row class="ml-16">
                    <v-col>
                        <v-card-text>Old Password</v-card-text>
                    </v-col>
                    <v-text-field type="password" style="margin-right:10rem; margin-top:10px" v-model="formProfile.oldPassword"></v-text-field>
                </v-row>

                <v-row class="ml-16">
                    <v-col>
                        <v-card-text>New Password</v-card-text>
                    </v-col>
                    <v-text-field type="password" style="margin-right:10rem; margin-top:10px" v-model="formProfile.newPassword"></v-text-field>
                </v-row>

                <v-row class="ml-16">
                    <v-col>
                        <v-card-text>Confirm Password</v-card-text>
                    </v-col>
                    <v-text-field type="password" style="margin-right:10rem; margin-top:10px" v-model="confirmPassword"></v-text-field>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="user.role == 'USER'" color="red" @click="hapus">Hapus Akun</v-btn>
                <v-btn color="green" @click="save">Save</v-btn>
            </v-card-actions>

        </v-card>
    </v-row>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{error_message}} </v-snackbar>

</v-main>
</template>

<script>
import {
    mdiAt,
    mdiCardAccountPhone,
    mdiPlusCircle
} from '@mdi/js';
export default {
    data() {
        return {
            user: {
                nama: '',
                email: '',
                phone: '',
                role: ''
            },
            icon: {
                email: mdiAt,
                phone: mdiCardAccountPhone,
                plusCircle: mdiPlusCircle
            },
            formProfile: {
                nama_user: '',
                email: '',
                telepon: '',
                oldPassword: '',
                newPassword: '',
            },
            confirmPassword: '',
            image: '',
            profileImg: '',
            snackbar: false,
            color: '',
            error_message: '',
        }
    },
    methods: {
        loadData() {

            this.profileImg = localStorage.getItem('profileImg') ? this.$api + '/user/image/' + localStorage.getItem('profileImg') :
                'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png';

            let url = this.$api + '/user';
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {

                this.user.nama = response.data.user.nama_user.toUpperCase();
                this.user.email = response.data.user.email;
                this.user.phone = response.data.user.telepon;
                this.user.role = response.data.user.role;

                this.formProfile.nama_user = this.user.nama;
                this.formProfile.email = this.user.email;
                this.formProfile.telepon = this.user.phone;

                console.table(response);
            }).catch(e => {
                this.error_message = e.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
        },
        save() {
            let url = this.$api + '/user/' + localStorage.getItem('id');

            if (this.confirmPassword === this.formProfile.newPassword) {
                this.$http.put(url, this.formProfile, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((response) => {
                    this.loadData();
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                }).catch(e => {
                    this.error_message = e.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                })
            } else {
                this.error_message = "Password Tidak Sesuai";
                this.color = "red";
                this.snackbar = true;
            }
        },
        hapus() {
            let url = this.$api + '/user/' + localStorage.getItem('id');
            this.$http.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                this.$router.replace('/');
                localStorage.removeItem('id');
                localStorage.removeItem('token');
                localStorage.removeItem('profileImg');
            }).catch(e => {
                this.error_message = e.response.data.message;
                this.color = "red";
                this.snackbar = true;
            })
        },
        onChange(e) {
            const file = e.target.files[0]
            this.image = file
            this.profileImg = URL.createObjectURL(file)

            if (this.image) {
                let url = this.$api + '/user/image';
                let dataFile = new FormData();

                dataFile.append('gambar', this.image);
                dataFile.append('id', localStorage.getItem('id'));

                this.$http.post(url, dataFile, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    localStorage.setItem('profileImg', response.data.user.gambar);
                    console.log(response);
                }).catch(e => {
                    console.log(e);
                })
            }
        }
    },
    mounted() {
        this.loadData();
    }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
