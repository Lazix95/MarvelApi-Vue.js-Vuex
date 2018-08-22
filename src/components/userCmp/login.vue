<template>
<div id="signin">
    <h1 class="title">--Sing In--</h1>
    <div class="signin-form">
        <form @submit.prevent="onSubmit">
            <div class="input" :class="{invalid: $v.email.$error}">
                <label for="email">Mail</label>
                <input type="email" id="email" v-model="email" @blur="$v.email.$touch()" :v="$v.email">
                <div class="separator"></div>
                <transition name="show">
                    <div class="message" v-if="!$v.email.email">
                        <b-alert show variant="danger">Enter valid email addres!!!</b-alert>
                    </div>
                    <div class="message" v-if="$v.email.email  && !$v.email.checkEmail">
                        <b-alert show variant="danger">E-mail not found,
                            <router-link to="/singup">Register</router-link>
                        </b-alert>
                    </div>
                </transition>

            </div>
            <div class="input" :class="{invalid: $v.password.$error}">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" @blur="$v.password.$touch();" :v="$v.password">
                <div class="separator"></div>
                <transition name="show" mode="out-in">
                    <div v-if="!$v.password.minLen && !wrongPassword && !resetPasswordRequest" class="message">
                        <b-alert show variant="danger">Password must have at last {{ $v.password.$params.minLen.min }} characters!!</b-alert>
                    </div>
                    <div v-if="wrongPassword" class="message">
                        <b-alert show variant="danger">Wrong password, <span @click="resetPassword" class="resetLink">Reset Password</span></b-alert>
                    </div>
                    <div v-if="resetPasswordRequest" class="message">
                        <b-alert show variant="success">Check your E-mail for reset request!!</b-alert>
                    </div>
                </transition>
            </div>
            <div class="radioButtons">
                <p> Log Me In For: </p>
                <div class="radio">
                    <input type="radio" name="logInTime" id="short" :value="false" checked="checked" v-model="foreverLogIn">
                    <label for="short">Short period <br> of time!</label>
                </div>
                <div class="radio">
                    <input type="radio" name="logInTime" id="forever" :value="true" v-model="foreverLogIn">
                    <label for="forever">Forever!</label>
                </div>

            </div>
            <div class="submit">
                <button type="submit" :disabled="$v.$invalid">Login</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import {
    required,
    email,
    minValue,
    numeric,
    minLength,
    sameAs
} from 'vuelidate/lib/validators'

import vue from 'vue'

export default {
    data() {
        return {
            email: "",
            password: "",
            foreverLogIn: false
        };
    },
    methods: {
        onSubmit() {
            const formData = {
                email: this.email,
                password: this.password
            };
            this.$store.dispatch("logIn", formData);
        },
        resetPassword($event) {
            const resetPasswordData = {
                requestType: "PASSWORD_RESET",
                email: this.email
            }
            this.$store.dispatch("resetPassword", resetPasswordData);
        }
    },
    watch:{
        foreverLogIn: function(){
            localStorage.setItem("foreverLogin", this.foreverLogIn)
            this.$store.commit("setForeverLogin", this.foreverLogIn)
        }
    },
    computed: {
        wrongPassword: function () {
            return this.$store.getters.getWrongPassword
        },
        resetPasswordRequest: function () {
            return this.$store.getters.getPasswordResetRequest;
        }
    },
    validations: {
        email: {
            required,
            email,
            checkEmail: (val) => {
                if (val === "" || val.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/) == null) {
                    return true;
                } else {
                    return new Promise((resolve) => {
                        vue.http.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/createAuthUri?key=AIzaSyBJjKfS2hr-ZTOCMB7X16xDL2H47482Ub8", {
                            identifier: val,
                            continueUri: window.location.href
                        }).then(res => {
                            resolve(res.body.registered)
                        }, err => {
                            console.log(err)
                            resolve(true)
                        })
                    })
                };
            }
        },
        password: {
            required,
            minLen: minLength(6)
        }
    },
    created(){
        this.foreverLogIn = localStorage.getItem("foreverLogin")
        this.$store.commit("setForeverLogin", false)
    }
};
</script>

<style lang="less" scoped>
.show-enter-active {
    transition: all 1s 0.4s;
    max-height: 50px;
}

.show-leave-active {
    transition: all 1s;
    max-height: 0px;
}

.show-enter {
    max-height: 0px
}

.show-leave {
    max-height: 50px
}

.show-leave-to {
    max-height: 0px
}

.message {
    overflow: hidden;
    height: 50px;
    >p {
        color: red
    }
    ;
}

.radioButtons {
    margin-bottom: 10px;
    overflow: auto;
    >.radio {
        display: inline-block;
        position: relative;
        width: 50%;
        float: left;
        >input {
            position: absolute;
            transform: translateX(-50%);
            top: 0%;
            left: 50%;
        }
        >label {
            margin-top: 15px;
        }
    }
}

.separator {
    width: 100%;
    height: 10px;
}

.title {
    margin: 50px auto;
    font-family: "Courier New", Courier, monospace;
}

.signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
    box-shadow: 10px 10px 88px -8px rgba(0,0,0,0.75);
    border-radius: 15px;
    >form {
        >.input {
            margin: 10px auto;
            >label {
                display: block;
                color: #4e4e4e;
                margin-bottom: 6px;
            }
            >input {
                font: inherit;
                width: 100%;
                padding: 6px 12px;
                box-sizing: border-box;
                border: 1px solid #ccc;
            }
            >input:focus {
                outline: none;
                border: 1px solid #521751;
                background-color: #eee;
            }
        }
        .input.invalid {
            >label {
                color: red;
            }
            >input {
                border: 1px solid red;
                background-color: #fcdddd
            }
        }
        >.submit {
            >button {
                border: 1px solid #521751;
                color: #521751;
                padding: 10px 20px;
                font: inherit;
                cursor: pointer;
                border-radius: 10px;
            }
            >button:hover,
            button:active {
                background-color: #521751;
                color: white;
            }
            >button[disabled],
            button[disabled]:hover,
            button[disabled]:active {
                border: 1px solid #ccc;
                background-color: transparent;
                color: #ccc;
                cursor: not-allowed;
            }
        }
    }
}

.resetLink {
    cursor: pointer;
    color: #0000EE;
}
</style>
