<template>
<div class="tab-pane active" id="home">
    <form @submit.prevent="onSubmit">

        <!-- First Name -->
        <div class="form-group">
            <div class="col-xs-6">
                <label for="first_name"><h4>First name</h4></label>
                <input type="text" class="form-control" name="first_name" id="first_name" placeholder="first name" v-model="name" @blur="$v.name.$touch()">
            </div>
            <transition name="show" mode="out-in">
                <div v-if="$v.name.$error" class="message">
                    <p v-if="!$v.name.required">First name is required!!</p>
                    <p v-if="!$v.name.minLen">First name must be at last {{ $v.name.$params.minLen.min }} characters long!!</p>
                </div>
            </transition>
        </div>

        <!-- Last Name -->
        <div class="form-group">
            <div class="col-xs-6">
                <label for="last_name"><h4>Last name</h4></label>
                <input type="text" class="form-control" name="last_name" id="last_name" placeholder="last name" v-model="surname" @blur="$v.surname.$touch()">
            </div>
            <transition name="show" mode="out-in">
                <div v-if="$v.surname.$error" class="message">
                    <p v-if="!$v.surname.required">Last name is required!!</p>
                    <p v-if="!$v.surname.minLen">Last name must be at last {{ $v.surname.$params.minLen.min }} characters long!!</p>
                </div>
            </transition>
        </div>

        <!-- User Name -->
        <div class="form-group">
            <div class="col-xs-6">
                <label for="username"><h4>User Name</h4></label>
                <input type="text" class="form-control" name="username" id="username" placeholder="Enter User Name" v-model="username" @blur="$v.username.$touch()" readonly>
            </div>
            <transition name="show" mode="out-in">
                <div v-if="$v.username.$error" class="message">
                    <p v-if="!$v.username.required">User name is required!!</p>
                    <p v-if="!$v.username.minLen">User name must be at last {{ $v.username.$params.minLen.min }} characters long!!</p>
                </div>
            </transition>
        </div>

        <!-- E-mail -->
        <div class="form-group">
            <div class="col-xs-6">
                <label for="email"><h4>Email</h4></label>
                <input type="email" class="form-control" name="email" id="email" placeholder="email@example.com" v-model="email" @blur="$v.email.$touch()" readonly>
            </div>
            <transition name="show">
                <div v-if="$v.email.$error" class="col-sm-8 offset-sm-3 message">
                    <p>Enter valid email addres!!!</p>
                </div>
            </transition>
        </div>

        <!-- Age -->
        <div class="form-group">
            <div class="col-xs-6">
                <label for="age"><h4>Your Age</h4></label>
                <input class="form-control" type="number" id="age" placeholder="Your Age" v-model.number="age" @blur="$v.age.$touch()">
            </div>
            <transition name="show" mode="out-in">
                <div v-if="$v.age.$error" class="message">
                    <p v-if="!$v.age.required">Age is required!!</p>
                    <p v-if="!$v.age.minVal">You Must be at last {{ $v.age.$params.minVal.min }} years old!!</p>
                </div>
            </transition>
        </div>

        <!-- Country -->
        <div class="form-group">
            <div class="col-xs-6">
                <label for="location"><h4>Location</h4></label>
                <input type="text" class="form-control" id="location" placeholder="somewhere" title="enter a location" v-model="country" @blur="$v.country.$touch()">
            </div>
            <transition name="show" mode="out-in">
                <div v-if="$v.country.$error" class="message">
                    <p>Country is required!!</p>
                </div>
            </transition>
        </div>

        <!-- Hobbies -->
        <div class="hobbies">
            <div class="hobbiesTitle">
                <h3>Your Hobbies</h3>
                <button @click="onAddHobby" type="button">Add Hobby</button>
            </div>
            <div class="hobby-list">
                <div class="form-group" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
                    <div class="col-xs-6 hobbies">
                        <label :for="hobbyInput.id">Hobby {{ index +1 }}</label>
                        <input type="text" :id="hobbyInput.id" class="form-control" v-model="hobbyInput.value" @blur="$v.hobbyInputs.$each[index].value.$touch()">
                        <button @click="onDeleteHobby(hobbyInput.id)" type="button" class="deleteHobby">X</button>
                    </div>

                    <transition name="show" mode="out-in">
                        <div v-if="$v.hobbyInputs.$each[index].value.$error" class=" message">
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

        <!-- New password -->
        <div class="form-group">
            <div class="col-xs-6">
                <label for="password"><h4> New Password</h4></label>
                <input type="password" class="form-control" name="password" id="password" placeholder="New Password" title="Enter your new password." v-model="password" @blur="$v.password.$touch();">
            </div>
            <transition name="show" mode="out-in">
                <div v-if="$v.password.$error" class="message">
                    <p v-if="!$v.password.minLen">Password must have at last {{ $v.password.$params.minLen.min }} characters!!</p>
                </div>
            </transition>
        </div>

        <!-- Confirm new password -->
        <div class="form-group">
            <div class="col-xs-6">
                <label for="password2"><h4>Confirm New Password</h4></label>
                <input type="password" class="form-control" name="password2" id="password2" placeholder="Confirm New Password" title="Enter your new password." v-model="confirmPassword" @blur="$v.confirmPassword.$touch()">
            </div>
            <transition name="show" mode="out-in">
                <div v-if="!$v.password.$invalid && $v.password.$dirty && !$v.confirmPassword.sameAs" class="message">
                    <p>Confirm password must be equal to password</p>
                </div>
            </transition>
        </div>

        <transition name="showUpdated">
            <div v-if="updated" class="messageUpdated">
                <hr>
                <b-alert show variant="success"><span>Successfully Updated!!</span></b-alert>
                <hr>
            </div>
        </transition>

        <div class="form-group">
            <div class="col-xs-12">
                <br>
                <button class="btn btn-lg btn-success" :disabled="$v.$invalid ||  (!$v.$anyDirty && picChenge)" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                <button class="btn btn-lg" type="reset" @click="fillUserInfo"><i class="glyphicon glyphicon-repeat"></i> Reset</button>
            </div>
        </div>
    </form>
    <hr>
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
                pic: this.$store.getters.getUserPic,
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
        },
        fillUserInfo: function () {
            this.name = this.user.name;
            this.surname = this.user.surname;
            this.username = this.user.username;
            this.email = this.user.email;
            this.age = this.user.age;
            this.country = this.user.country;
            this.hobbyInputs = [];
            this.fillHobbies(this.user.hobbies);
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.getUser;
        },
        updated: function () {
            return this.$store.getters.getUpdated;
        },
        picChenge: function () {
            return this.$store.getters.getUser.pic === this.$store.getters.getUserPic
        }
    },
    created() {
        this.fillUserInfo();
        this.$store.commit('setViewBookmarked', true)
        // this.$store.dispatch("postMessage", {
        //    from: "aaaaa",
        //     to: 'someone',
        //     message: "heeeeey"
        //  })
    },
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

.hobbies {
    position: relative;
}

.deleteHobby {
    position: absolute;
    top: 38px;
    right: 10px;
    background: transparent;
    border: none;
    opacity: 0.5;
    cursor: pointer;
}

.deleteHobby:hover {
    transition: all 0.3s;
    opacity: 1;
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
    >button:active {
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
    >button:active {
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
