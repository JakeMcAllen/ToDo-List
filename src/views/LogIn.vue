<template>
    <div id="logIn_div">
        <div>
            <p 
                v-show="message!=''"
                v-bind:style=colorText
            > {{message}} </p>
            <h1>
                Username:
            </h1>
            <input
                v-model="username" 
                placeholder="Username" 
                id="usernameBox"
            >
        </div>
        <button 
            id="enterButton"
            v-on:click="logUser"
        >
            ENTER
        </button>
    </div>
</template>

<script>
import { db } from '@/firebase'

export default ({
    name: 'logIn',
    data() {
        return {
            username: "",
            message: "",
            colorText: {color: '#ff0000'},
        }
    },
    methods: {
        logUser () {
            if (this.username != '' ) {
                this.colorText.color = '#ff0000';
                this.message = "Error: user not found ";
            }

            db.collection('Users').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if( doc.data().username == this.username) {
                        this.colorText.color = '#00ff00';
                        this.message = "LogIn User: " + this.username;
                        this.$cookie.set('test', this.username, {expires: 7});

                        this.GlobalVar = this.username;
                        this.username = '';
                    }
                })
            })
        },
    }
})
</script>

<style scoped>
p {
    margin: 0;
}
#logIn_div {
    margin-top: 10%;
    background: cornflowerblue;
    width: 50%;
    margin: 10% auto;
    padding: 5%;
    border-radius: 10px;
}
#usernameBox {
    width: 250px;
    height: 30px;
    font-size: 15px;
    padding: 2px;
}
#enterButton{
    margin-top: 20px;
    width: 250px;
    height: 50px;
    font-size: 15px;
    font-weight: 800;
    color: white;
    background-color: #0000b7;
    border: 0;
    border-radius: 15px;
}
</style>
