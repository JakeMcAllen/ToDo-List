<template> 
    <div id="root">
        <div id="todo_list_box">
            <div id="add_job_box">
                <input 
                    v-model="newJob" 
                    placeholder="Type and hit enter" 
                    id="newjob"
                >
                <button v-on:click="addJob" id="addjob">+</button>
            </div>
            <div 
                ref="job_list" 
                id='job_list' 
                v-bind:style="{height: `${height}px`}"
            > 
                <Job 
                    v-for="{id, done, register, text, user, show } in jobs" :key="id"

                    v-bind:initialMessage=text
                    v-bind:ths=ths
                    v-bind:done=done
                    v-bind:register=register
                    v-bind:user=user
                    v-bind:id=id
                    v-bind:show=show
                />     
            </div>
        </div>
        <div 
            id="archiveAll" 
            ref="archiveAll" 
        >
            <p> Done works: {{job_checked}} </p>
            <button 
                :disabled="job_checked == 0"
                v-on:click="archiveAll"
                id="archiveButton"
                v-bind:style=archiveButtonColor
            > ARCHIVE DONE WORKS </button>
        </div>
    </div>
</template>



<script>
import Job from "@/components/Job.vue";
import { db, createJob } from '@/firebase';
import Vue from 'vue';

export default {
    name: 'TodoList',
    components: {
        Job,
    },
    data() {
        return {
            newJob: "",
            height: 0,
            jbs_counter: 0,
            job_checked: 0,
            user: '',
            jobs: [],
            jobs_list: [],
            ths: this,
            archiveButtonColor: {backgroundColor: '#ffffff'}
        }
    },
    methods: {
        setHeight() {

            var p = document.getElementById("job_list");
            var style = p.currentStyle || window.getComputedStyle(p);

            this.height = parseInt( window.innerHeight ) - parseInt( this.$refs.job_list.getBoundingClientRect().top ) +
                ( parseInt( this.$refs.job_list.offsetHeight ) - parseInt( this.$refs.job_list.clientHeight) - parseInt( style.marginTop ) - parseInt( style.marginBottom) - parseInt(this.$refs.archiveAll.offsetHeight )  ) - 16;

        },
        async addJobOnServer() {
            var job = {text: this.newJob, user: this.user, done: false, register: false }
            return await createJob({ ...job })
        }, 
        addJob () {

            var ComponentClass = Vue.extend(Job);
            var id = this.addJobOnServer();
            var instance = new ComponentClass({
                propsData: {
                    initialMessage: this.newJob, 
                    ths: this,
                    show: true,
                    user: this.user,
                    register: false,
                    done: false,
                    id: id,
                }
            });
            instance.$mount();


            this.jobs = [];
            this.jobs_list = [];

            db.collection('Jobs').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().user == this.user && !doc.data().register) {
                        let item = doc.data()
                        item.id = doc.id
                        item.show = true
                        this.jobs.push(item)

                        if ( doc.data().done ) {
                            this.job_checked++;
                            this.archiveButtonColor.backgroundColor = '#058aff';
                        }
                    }
                })
            })



            this.newJob = "";
            this.setHeight();
            this.jbs_counter++;

        },
        archiveAll () {

            this.jobs_list.forEach(job => {
                if (job.archiveButtonVisible) job.archive();
            });
        },
    },
    created() {
        this.user = this.$cookie.get('test').toLowerCase();

        db.collection('Jobs').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().user == this.user && !doc.data().register) {
                    let item = doc.data()
                    item.id = doc.id
                    item.show = true
                    this.jobs.push(item)

                    if ( doc.data().done ) {
                        this.job_checked++;
                        this.archiveButtonColor.backgroundColor = '#058aff';
                    }
                }
            })
        })
    },
    mounted() {
        this.setHeight();
        window.addEventListener("resize", this.setHeight() );
        this.$store.dispatch("getPosts");
    },
};
</script>

<style scoped>
#job_list {
    border: 1px solid black;
    width: 50%;
    margin: 10px auto 1% auto;
    padding: 5px;
    overflow: auto;
}
#newjob {
    height: 25px;
    width: 40%;
    border-radius: 10px;
    margin-right: 10px;
    padding-left: 15px;
}
#addjob {
    height: 40px;
    width: 40px;
    font-size: larger;
    font-weight: 800;
    background-color: skyblue;
    border: 0px;
}
p { margin: 0; }
#archiveButton {
    margin: 10px;
    height: 40px;
    width: 300px;
    font-size: larger;
    font-weight: 600;
    border-radius: 15px;
    border: 1px solid black;
}
</style>
