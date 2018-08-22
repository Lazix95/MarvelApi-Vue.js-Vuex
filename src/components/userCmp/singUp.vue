<template>
<div id="signup">
    <div class="signup-form">
        <form @submit.prevent="onSubmit">

            <!-- Name -->
            <div class="input" :class="{invalid: $v.name.$error}">
                <label for="name">Name*</label>
                <input type="text" id="name" v-model="name" @blur="$v.name.$touch()">
                <transition name="show" mode="out-in">
                    <div v-if="$v.name.$error" class="message">
                        <p v-if="!$v.name.required">Surname is required!!</p>
                        <p v-if="!$v.name.minLen">Surname must be at last {{ $v.name.$params.minLen.min }} characters long!!</p>
                    </div>
                </transition>
            </div>

            <!-- Surname -->
            <div class="input" :class="{invalid: $v.surname.$error}">
                <label for="surname">Surname*</label>
                <input type="text" id="surname" v-model="surname" @blur="$v.surname.$touch()">
                <transition name="show" mode="out-in">
                    <div v-if="$v.surname.$error" class="message">
                        <p v-if="!$v.surname.required">Surname is required!!</p>
                        <p v-if="!$v.surname.minLen">Surname must be at last {{ $v.surname.$params.minLen.min }} characters long!!</p>
                    </div>
                </transition>
            </div>

            <!-- User name -->
            <div class="input" :class="{invalid: $v.username.$error}">
                <label for="username">User Name*</label>
                <input type="text" id="username" v-model="username" @blur="$v.username.$touch()">
                <transition name="show" mode="out-in">
                    <div v-if="$v.username.$error" class="message">
                        <p v-if="!$v.username.required">User name is required!!</p>
                        <p v-if="!$v.username.minLen">User name must be at last {{ $v.username.$params.minLen.min }} characters long!!</p>
                        <p v-if="!$v.username.checkUserName">User name is used, chose another!!</p>
                    </div>
                </transition>
            </div>

            <!-- E-mail -->
            <div class="input" :class="{invalid: $v.email.$error}">
                <label for="email">Mail*</label>
                <input type="email" id="email" v-model="email" @blur="$v.email.$touch()">
                <transition name="show">
                    <div class="message" v-if="!$v.email.email">
                        <p show variant="danger">Enter valid email addres!!!</p>
                    </div>
                    <div class="message" v-if="$v.email.$error  && !$v.email.checkEmail">
                        <p show variant="danger">E-mail is taken, chose another!!
                        </p>
                    </div>
                </transition>
            </div>

            <!-- Age -->
            <div class="input" :class="{invalid: $v.age.$error}">
                <label for="age">Your Age*</label>
                <input type="number" id="age" v-model.number="age" @blur="$v.age.$touch()">
                <transition name="show" mode="out-in">
                    <div v-if="$v.age.$error" class="message">
                        <p v-if="!$v.age.required">Age is required!!</p>
                        <p v-if="!$v.age.minVal">You Must be at last {{ $v.age.$params.minVal.min }} years old!!</p>
                    </div>
                </transition>
            </div>

            <!-- Password -->
            <div class="input" :class="{invalid: $v.password.$error}">
                <label for="password">Password*</label>
                <input type="password" id="password" v-model="password" @blur="$v.password.$touch();">
                <transition name="show" mode="out-in">
                    <div v-if="$v.password.$error" class="message">
                        <p v-if="!$v.password.required">Password is required!!</p>
                        <p v-if="!$v.password.minLen">Password must have at last {{ $v.password.$params.minLen.min }} characters!!</p>
                    </div>
                </transition>
            </div>

            <!-- Confirm Password -->
            <div class="input" :class="{invalid: $v.confirmPassword.$invalid}">
                <label for="confirm-password">Confirm Password*</label>
                <input type="password" id="confirm-password" v-model="confirmPassword" @blur="$v.confirmPassword.$touch()">
                <transition name="show" mode="out-in">
                    <div v-if="$v.confirmPassword.$invalid" class="message">
                        <p v-if="!$v.confirmPassword.sameAs">Confirm password must be equal to password</p>
                    </div>
                </transition>
            </div>

            <!-- Country -->
            <div class="input" :class="{invalid: $v.country.$error}">
                <label for="country">Country*</label>
                <input id="country" type="text" v-model="country" @blur="$v.country.$touch()">
                <transition name="show" mode="out-in">
                    <div v-if="$v.country.$error" class="message">
                        <p>Country is required!!</p>
                    </div>
                </transition>
            </div>

            <!-- hobbies -->
            <div class="hobbies">
                <h3>Add some Hobbies*</h3>
                <button @click="onAddHobby" type="button">Add Hobby</button>
                <div class="hobby-list">
                    <div class="input" :class="{invalid: $v.hobbyInputs.$each[index].value.$error}" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
                        <label :for="hobbyInput.id">Hobby {{ index +1 }}</label>
                        <input type="text" :id="hobbyInput.id" v-model="hobbyInput.value" @blur="$v.hobbyInputs.$each[index].value.$touch()">
                        <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
                        <transition name="show" mode="out-in">
                            <div v-if="$v.hobbyInputs.$each[index].value.$error" class="message">
                                <p>Hobby is required!</p>
                            </div>
                        </transition>
                    </div>
                    <transition name="show" mode="out-in">
                        <div class="message">
                            <p v-if="!$v.hobbyInputs.required">Please add hobbies</p>
                            <p v-if="!$v.hobbyInputs.minLen">You have to spacify at last {{$v.hobbyInputs.$params.minLen.min}} hobbies!</p>
                        </div>
                    </transition>
                </div>
            </div>

            <hr>

            <!-- Terms -->
            <div class="input inline" :class="{invalid: $v.terms.$invalid}">
                <input type="checkbox" id="terms" @change="$v.terms.$touch()" v-model="terms">
                <label for="terms">Accept Terms of Use</label>
            </div>

            <!-- Submit Button -->
            <div class="submit">
                <button type="submit" :disabled="$v.$invalid">Sing Up</button>
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
            name: "",
            surname: "",
            username: "",
            email: "",
            age: null,
            password: "",
            confirmPassword: "",
            country: "",
            hobbyInputs: [],
            terms: false
        };
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
                            resolve(!res.body.registered)
                        }, err => {
                            console.log(err)
                            resolve(false)
                        })
                    })
                };
            }
        },
        age: {
            required,
            numeric,
            minVal: minValue(10)
        },
        password: {
            required,
            minLen: minLength(6)
        },
        confirmPassword: {
            sameAs: sameAs("password")
        },
        username: {
            required,
            minLen: minLength(3),
            checkUserName: (val) => {
                if (val.length<3) {
                    return true;
                } else {
                    var vm = this;
                    return new Promise((resolve) => {
                        vue.http.get('https://vue-js-app-d8354.firebaseio.com/userNames.json?orderBy="username"&equalTo="'+val+'"' ).then(res => {
                            console.log(Object.keys(res.body).length>0)
                            if (Object.keys(res.body).length>0){
                                resolve(false)
                            }else{
                                resolve(true)
                            }
                        }, err => {
                            console.log(err)
                            resolve(true)
                        })
                    })
                };
            }
        },
        name: {
            required,
            minLen: minLength(3)
        },
        surname: {
            required,
            minLen: minLength(3)
        },
        country: {
            required
        },
        terms: {
            sameAs: sameAs(() => {
                return true
            })
        },
        hobbyInputs: {
            required,
            minLen: minLength(2),
            $each: {
                value: {
                    required,
                }
            }
        }
    },
    methods: {
        onAddHobby() {
            const newHobby = {
                id: Math.random() * Math.random() * 1000,
                value: ""
            };
            this.hobbyInputs.push(newHobby);
        },
        onDeleteHobby(id) {
            this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id);
        },
        onSubmit() {
            const formData = {
                name: this.name,
                surname: this.surname,
                username: this.username,
                email: this.email,
                age: this.age,
                password: this.password,
                confirmPassword: this.confirmPassword,
                country: this.country,
                hobbies: this.hobbyInputs.map(hobby => hobby.value),
                terms: this.terms
            };
            this.$store.dispatch("singUpNewUser", formData);
        }
    }
};
</script>

<style lang="less" scoped>
.show-enter-active,
.show-leave-active {
    transition: all 1s;
    max-height: 30px;
}

.show-enter,
.show-leave-to {
    max-height: 0px
}

.message {
    overflow: hidden;
    height: 25px;
    >p {
        color: red
    }
}

.signup-form {
    width: 550px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
}

.input {
    margin: 10px auto;
    >label {
        display: block;
        color: #4e4e4e;
        margin-bottom: 6px;
    }
    >input {
        font: inherit;
        width: 80%;
        padding: 6px 12px;
        box-sizing: border-box;
        border: 1px solid #ccc;
    }
    >input:focus {
        outline: none;
        border: 1px solid #521751;
        background-color: #eee;
    }
    >select {
        border: 1px solid #ccc;
        font: inherit;
        border-radius: 5px;
        padding: 0 5px;
    }
}

form>.inline {
    input {
        width: auto;
        display: inline-block;
    }
    label {
        width: auto;
        display: inline-block;
    }
}

.hobbies {
    >button,
    .hobby-list>.input>button {
        border: 1px solid #521751;
        background: #521751;
        color: white;
        padding: 6px;
        margin: 15px auto;
        font: inherit;
        cursor: pointer;
        border-radius: 10px;
    }
    >button:hover,
    button:active {
        background-color: #8d4288;
    }
    >.hobby-list>.input>input {
        width: 90%;
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

.submit {
    >button {
        border: 1px solid #521751;
        color: #521751;
        padding: 7px 20px;
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
</style>
