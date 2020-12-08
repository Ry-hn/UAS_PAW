<template>
<v-app>
    <v-main>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="8">
                    <v-card class="elevation-12">
                        <v-window v-model="step">
                            <v-window-item :value="1">
                                <v-row>
                                    <v-col cols="12" md="8">
                                        <v-card-text class="mt-12">
                                            <h1 class="text-center display-2 brown--text text--accent-3">Sign in</h1>
                                
                                            <v-form>
                                                <v-text-field v-model="email" label="Email" name="Email"  type="text" color="brown accent-3" />
                                                <v-text-field v-model="password" id="password" label="Password" name="Password" type="password" color="brown accent-3" />
                                            </v-form>
                                            <h3 class="text-center mt-3"> Forget your password ?</h3>
                                        </v-card-text>
                                        <div class="text-center mt-3">
                                            <v-btn rounded color="brown accent-3" dark @click="login">SIGN IN </v-btn>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="brown accent-3">
                                        <v-card-text class="white--text mt-12">
                                            <h1 class="text-center display-1">Hello !</h1>
                                            <h5 class="text-center">Enter your personnel details</h5>
                                        </v-card-text>
                                        <div class="text-center">
                                            <v-btn rounded outlined="" dark @click="step++, resetField()">SIGN UP</v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-window-item>

                            <v-window-item :value="2">
                                <v-row class="fill-height">
                                    <v-col cols="12" md="4" class="brown accent-3">
                                        <v-card-text class="white--text mt-12">
                                            <h1 class="text-center display-1">Welcome Back!</h1>
                                            <h5 class="text-center">To keep connected with us please login with your personnel info</h5>
                                        </v-card-text>
                                        <div class="text-center">
                                            <v-btn rounded outlined dark @click="step--, resetField()">SIGN IN</v-btn>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-card-text class="mt-12">
                                            <h1 class="text--center display-2 brown--text text--accent-3">Create Account</h1>
                                         
                                            <v-form>
                                                <v-text-field v-model="name" label="Name" name="Name"  :rules="emptyRules" type="text" color="brown accent-3"></v-text-field>
                                                <v-text-field v-model="telepon" type="number" label="Telepon" name="Telepon" :rules="emptyRules" color="brown accent-3"></v-text-field>
                                                <v-text-field v-model="email" label="Email" name="Email" :rules="emailRules" type="text" color="brown accent-3" />
                                                <v-text-field v-model="password" label="Password" name="Pssword" :rules="emptyRules" type="password" color="brown accent-3" />
                                            </v-form>
                                        </v-card-text>
                                        <div class="text-center mt-n5">
                                            <v-btn rounded color="brown accent-3" dark @click="signUp">SIGN UP</v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                        </v-window>
                    </v-card>
                </v-col>
            </v-row>

            <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{error_message}} </v-snackbar>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {
    data: () => ({
        step: 1,
        email: '',
        password: '',
        snackbar:false,
        color:'',
        error_message: '',
        name: '',
        telepon: '',
        emptyRules: [ (v) => !!v || 'Field tidak boleh kosong :(', ], 
        emailRules: [ v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) && !!v || 'E-mail valid dong  :(']
    }),
    methods: {
        login() {
            let url = this.$api + "/login";
            this.$http.post(url, {
                email: this.email,
                password: this.password
            }).then( (response) => {

                localStorage.setItem('id', response.data.user.id);
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('profileImg', response.data.user.gambar);
                
                this.$router.replace('/');
                console.table(response);
            }).catch( e => {
                this.error_message = e.response.data.message;
                this.color="red";
                this.snackbar = true;
            })
        },
        signUp() {

            if(this.name && this.email && this.telepon && this.password) {
                let url = this.$api + "/register";
                this.$http.post(url, {
                    nama_user: this.name,
                    email: this.email,
                    telepon: this.telepon,
                    password: this.password,
                    role: "USER"
                }).then( (response) => { 
                    // console.log(`id : ${localStorage.getItem('token')}`);
                    location.reload();
                    console.table(response);
                }).catch( e => {
                    this.error_message = e.response.data.message;
                    this.color="red";
                    this.snackbar = true;
                });
            }
            else {
                this.error_message = "Silahkan Isi semua field Terlebih Dahulu";
                this.color="red";
                this.snackbar = true;
            }
        },
        resetField() {
            console.log("mlebu");
            this.name= '';
            this.telepon= '';
            this.email= '';
            this.password= '';
            this.color= '';
            this.error_message= '';
            this.snackbar= false;
        },
    },
    props: {
        source: String
    }
};
</script>

<style >
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