<template>
<div class="container">
    <div id="signup">
        <div class="signup-form">
            <form @submit.prevent="onSubmit">
                <!-- Name -->
                <div class="input row" :class="{invalid: $v.name.$error}">
                    <label class="col-sm-3" for="name">Name</label>
                    <input class="col-sm-8" type="text" id="name" v-model="name" @blur="$v.name.$touch()">
                    <transition name="show" mode="out-in">
                        <div v-if="$v.name.$error" class="col-sm-8 offset-sm-3 message">
                            <p v-if="!$v.name.required">Surname is required!!</p>
                            <p v-if="!$v.name.minLen">Surname must be at last {{ $v.name.$params.minLen.min }} characters long!!</p>
                        </div>
                    </transition>
                </div>

                <!-- Surname -->
                <div class="input row" :class="{invalid: $v.surname.$error}">
                    <label class="col-sm-3" for="surname">Surname</label>
                    <input class="col-sm-8" type="text" id="surname" v-model="surname" @blur="$v.surname.$touch()">
                    <transition name="show" mode="out-in">
                        <div v-if="$v.surname.$error" class="col-sm-8 offset-sm-3 message">
                            <p v-if="!$v.surname.required">Surname is required!!</p>
                            <p v-if="!$v.surname.minLen">Surname must be at last {{ $v.surname.$params.minLen.min }} characters long!!</p>
                        </div>
                    </transition>
                </div>

                <!-- User name -->
                <div class="input row" :class="{invalid: $v.username.$error}">
                    <label class="col-sm-3" for="username">User Name</label>
                    <input class="col-sm-8" type="text" id="username" v-model="username" @blur="$v.username.$touch()">
                    <transition name="show" mode="out-in">
                        <div v-if="$v.username.$error" class="col-sm-8 offset-sm-3 message">
                            <p v-if="!$v.username.required">User name is required!!</p>
                            <p v-if="!$v.username.minLen">User name must be at last {{ $v.username.$params.minLen.min }} characters long!!</p>
                        </div>
                    </transition>
                </div>

                <!-- E-mail -->
                <div class="input row" :class="{invalid: $v.email.$error}">
                    <label class="col-sm-3" for="email">Mail</label>
                    <input class="col-sm-8" type="email" id="email" v-model="email" @blur="$v.email.$touch()">
                    <transition name="show">
                        <div v-if="$v.email.$error" class="col-sm-8 offset-sm-3 message">
                            <p>Enter valid email addres!!!</p>
                        </div>
                    </transition>
                </div>

                <!-- Age -->
                <div class="input row" :class="{invalid: $v.age.$error}">
                    <label class="col-sm-3" for="age">Your Age</label>
                    <input class="col-sm-8" type="number" id="age" v-model.number="age" @blur="$v.age.$touch()">
                    <transition name="show" mode="out-in">
                        <div v-if="$v.age.$error" class="col-sm-8 offset-sm-3 message">
                            <p v-if="!$v.age.required">Age is required!!</p>
                            <p v-if="!$v.age.minVal">You Must be at last {{ $v.age.$params.minVal.min }} years old!!</p>
                        </div>
                    </transition>
                </div>

                <!-- Password -->
                <div class="input row" :class="{invalid: $v.password.$error}">
                    <label class="col-sm-3" for="password">New Password</label>
                    <input class="col-sm-8" type="password" id="password" v-model="password" @blur="$v.password.$touch();">
                    <transition name="show" mode="out-in">
                        <div v-if="$v.password.$error" class="col-sm-8 offset-sm-3 message">
                            <p v-if="!$v.password.minLen">Password must have at last {{ $v.password.$params.minLen.min }} characters!!</p>
                        </div>
                    </transition>
                </div>

                <!-- Confirm Password -->
                <div class="input row" :class="{invalid: $v.confirmPassword.$invalid}">
                    <label class="col-sm-3" for="confirm-password">Confirm New Password</label>
                    <input class="col-sm-8" type="password" id="confirm-password" v-model="confirmPassword" @blur="$v.confirmPassword.$touch()">
                    <transition name="show" mode="out-in">
                        <div v-if="$v.confirmPassword.$invalid" class="col-sm-8 offset-sm-3 message">
                            <p v-if="!$v.confirmPassword.sameAs">Confirm password must be equal to password</p>
                        </div>
                    </transition>
                </div>

                <!-- Country -->
                <div class="input row" :class="{invalid: $v.country.$error}">
                    <label class="col-sm-3" for="country">Country</label>
                    <input class="col-sm-8" id="country" type="text" v-model="country" @blur="$v.country.$touch()">
                    <transition name="show" mode="out-in">
                        <div v-if="$v.country.$error" class="col-sm-8 offset-sm-3 message">
                            <p>Country is required!!</p>
                        </div>
                    </transition>
                </div>

                <!-- hobbies -->

                <div class="hobbies">
                    <div class="hobbiesTitle row">
                        <h3 class="offset-sm-3 col-sm-8">Your Hobbies</h3>
                        <div class="col-sm-3"></div>
                        <button class="offset-sm-4" @click="onAddHobby" type="button">Add Hobby</button>
                    </div>
                    <div class="hobby-list">
                        <div class="input row" :class="{invalid: $v.hobbyInputs.$each[index].value.$error}" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
                            <label class="col-sm-3" :for="hobbyInput.id">Hobby {{ index +1 }}</label>
                            <input class="col-sm-8" type="text" :id="hobbyInput.id" v-model="hobbyInput.value" @blur="$v.hobbyInputs.$each[index].value.$touch()">
                            <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
                            <transition name="show" mode="out-in">
                                <div v-if="$v.hobbyInputs.$each[index].value.$error" class="col-sm-8 offset-sm-3 message">
                                    <p>Hobby is required!</p>
                                </div>
                            </transition>
                        </div>
                        <transition name="show" mode="out-in">
                            <div class="col-sm-8 offset-sm-3 message">
                                <p v-if="!$v.hobbyInputs.required">Please add hobbies</p>
                                <p v-if="!$v.hobbyInputs.minLen">You have to spacify at last {{$v.hobbyInputs.$params.minLen.min}} hobbies!</p>
                            </div>
                        </transition>
                    </div>
                </div>
                <hr>
                <transition name="showUpdated">
                    <div v-if="updated" class="messageUpdated">
                        <b-alert show variant="success"><span>Successfully Updated!!</span></b-alert>
                        <hr>
                    </div>
                </transition>
                <!-- Submit Button -->
                <div class="submit row">
                    <div class="col-sm-3"></div>
                    <button type="submit" class=" offset-sm-4" :disabled="$v.$invalid ||  !$v.$anyDirty">Save</button>
                </div>
            </form>
        </div>
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
} from "vuelidate/lib/validators";

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
            email
        },
        age: {
            required,
            numeric,
            minVal: minValue(10)
        },
        password: {
            minLen: minLength(6)
        },
        confirmPassword: {
            sameAs: sameAs("password")
        },
        username: {
            required,
            minLen: minLength(3)
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
        hobbyInputs: {
            required,
            minLen: minLength(2),
            $each: {
                value: {
                    required
                }
            }
        }
    },
    methods: {
        onAddHobby() {
            var newHobby = {
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
                password: this.password ? this.password : this.user.password,
                confirmPassword: this.confirmPassword ? this.confirmPassword : this.user.confirmPassword,
                country: this.country,
                hobbies: this.hobbyInputs.map(hobby => hobby.value)
            };
            if (this.password) {
                var changePasswordData = {
                    idToken: this.$store.getters.getIdToken,
                    password: this.password,
                    returnSecureToken: true
                }
                this.$store.dispatch("changePassword", changePasswordData);
            }
            if (this.user != formData) {
                this.$store.dispatch("updateProfile", formData);
            }
        },
        fillHobbies: function (hobbi) {
            if (!hobbi) {
                return;
            }
            for (var i = 0; i < hobbi.length; i++) {
                var newHobb = {
                    id: Math.random() * Math.random() * 1000,
                    value: hobbi[i]
                };
                this.hobbyInputs.push(newHobb);
            }
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.getUser;
        },
        updated: function () {
            return this.$store.getters.getUpdated;
        }
    },
    created() {
        this.name = this.user.name;
        this.surname = this.user.surname;
        this.username = this.user.username;
        this.email = this.user.email;
        this.age = this.user.age;
        this.country = this.user.country;
        this.fillHobbies(this.user.hobbies);
        this.$store.commit('setViewBookmarked', true)
    }
};
</script>

<style lang="less" scoped>
.show-enter-active {
    transition: all 1s;
    max-height: 30px;
}

.show-leave-active,
.showUpdated-leave-active {
    transition: all 1s;
    max-height: 0px;
}

.showUpdated-enter-active {
    transition: all 1s;
    max-height: 85px;
}

.show-enter,
.showUpdated-enter {
    max-height: 0px
}

.show-leave {
    max-height: 30px
}

.showUpdated-leave {
    max-height: 85px
}

.messageUpdated {
    overflow: hidden;
    height: 85px;
}

.separator {
    width: 100%;
    height: 10px;
}

.message {
    overflow: hidden;
    height: 25px;
    >p {
        color: red;
    }
}

.signup-form {
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
}

.input {
    margin: 10px auto;
    >label {
        color: #4e4e4e;
        margin-bottom: 6px;
    }
    >input {
        font: inherit;
        padding: 6px 12px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        text-align: center;
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

.input.invalid {
    >label {
        color: red;
    }
    >input {
        border: 1px solid red;
        background-color: #fcdddd;
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
    >.hobbiesTitle>button,
    .hobby-list>.input>button {
        border: 1px solid #521751;
        background: #521751;
        color: white;
        padding: 6px; //  margin: 0 0 0 10px;
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
    >.hobbiesTitle {
        margin: 25px 0;
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

@media (min-width: 576px) {
    .offset-sm-4 {
        margin-left: 28.966667%;
    }
}
</style>
