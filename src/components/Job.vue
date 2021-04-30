<template>
    <div 
        class="barraJob" 
        v-bind:style="{ backgroundColor: initialColor}"
        v-show="sw"
    > 
        <input 
            type="checkbox" 
            class="checkbox" 
            v-model="done" 
            v-on:change="updateCounter"
            v-show="!this.register"
        >
        <button 
            id="modify_button"
            v-on:click="modify_apply"
            v-bind:style=applayBoxColor
            :disabled=register
        > 
            {{mdf_msg}}
        </button>

        <input 
            v-model="msg" 
            placeholder="msg" 
            class="nomeJob"
            ref="nomeJob"
            v-bind:style=modifyMode
            :disabled=disableInput
        >

        <button 
            v-on:click="archive" 
            :style="checkboxColor"
            class="archive_rewrite"
            v-show="archiveButtonVisible"
        > ARCHIVE </button>

        <button 
            class="dlt_btn" 
            v-on:click="dlt" 
        >X</button>
    </div>
</template>

<script>
import { deleteJobsById, updateJob } from '@/firebase';

export default {
    name: 'job',
    props: ['initialMessage', 'ths', 'done', 'register', 'user', 'id', 'show'],
    data() {
        return {
            disableInput: true,
            archiveButtonVisible: this.done,
            sw: true,
            mdf_msg: "modify",
            msg: this.initialMessage,
            initialColor: '#66ccff',
            archive_rewrite: this.register,
            checkboxColor: { backgroundColor: '#00b300'},
            applayBoxColor: { backgroundColor: '#ffffff', color: "#000000", width: '80px' },
            modifyMode: {border: "0px", borderRadius: "15px"}
        }
    },
    methods: {
        dlt() {
            deleteJobsById(this.id)
            this.show = false;
            if (this.ths.job_checked > 0) this.ths.job_checked--;            
        },
        archive() {
            this.sw = false;
            this.show = false;

            var jobUpdate = {text: this.msg, user: this.user, done: true, register: true }
            updateJob(this.id, jobUpdate);

            if (this.ths.job_checked > 0) this.ths.job_checked--;
        },
        updateCounter() {
            this.archiveButtonVisible = !this.archiveButtonVisible;
            if (this.done) this.ths.job_checked++;
            else this.ths.job_checked--;

            if (this.ths.job_checked > 0) this.ths.archiveButtonColor.backgroundColor = '#058aff';
            else this.ths.archiveButtonColor.backgroundColor = '#ffffff';

            this.archive_rewrite = !this.archive_rewrite;

            var jobUpdate = {text: this.msg, user: this.user, done: this.done, register: this.register }
            updateJob(this.id, jobUpdate);
        },
        modify_apply() {
            this.disableInput = !this.disableInput;
            if (this.mdf_msg == "modify") {
                this.mdf_msg = "apply"; 
                this.applayBoxColor.backgroundColor = "#ffff00"
                this.$refs.nomeJob.focus();
                this.modifyMode.border = "2px solid black";
            } else { 
                var jobUpdate = {text: this.msg, user: this.user, done: this.done, register: this.register }
                updateJob(this.id, jobUpdate);

                this.mdf_msg = "modify";
                this.applayBoxColor.backgroundColor = "#ffffff"
                this.modifyMode.border = "0px";
            }
        }
    },
    mounted() {
        if (this.register) {
            this.mdf_msg = "By: " + this.user;
            this.applayBoxColor.width = '200px';
        }

        this.ths.jobs_list.push(this)
    }
}
</script>



<style scoped>
.checkbox {
    margin: auto 0px auto 10px;
}
.barraJob {
    display: inline-flex;
    width: 70%;
    margin: 1px 0%;
    padding: 10px 0;
    border-radius: 15px;
}
.nomeJob {
    background-color: transparent;
    border: 0;
    color: black;
    margin: auto 15px auto 5px;
    width: 100%;
    padding-left: 10px;
}
button {
    height: 25px;
    width: 25px;
    margin: auto 0;
}
#modify_button {
    width: 70px;
    border: 0px;
    background-color: white;
    border-radius: 15px;
    font-weight: 700;
    margin-left: 10px;
}
.archive_rewrite {
    width: auto;
    color: white;   
    border: 0;
    font-weight: 700;
}
.dlt_btn {
    margin-right: 15px;
    background-color: red;
    color: white;
    border: 0;
    font-weight: 700;
}
</style>
