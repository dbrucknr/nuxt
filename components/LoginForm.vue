<template>
    <div>
        <h1>Login</h1>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field 
                            v-model="email"
                            :rules="emailRules"
                            label="Email"
                            required
                        />
                    </v-col>
                    <v-col
                        cols="12"
                        md="4"
                    >
                        <v-text-field 
                            v-model="password"
                            :rules="[passwordRules.required]"
                            :type="show ? 'text' : 'password'"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            label="Password"
                            @click:append="show = !show"
                        />
                    </v-col>
                </v-row>
                <v-btn small color="primary" @click="formatLogin">Login In</v-btn>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'LoginForm',
    data: () => ({
        valid: false,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        show: false,
        passwordRules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
    }),
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        formatLogin() {
            console.log('Test')
            this.login({ email: this.email, password: this.password });
            this.$router.push('/');
        }
    }
}
</script>