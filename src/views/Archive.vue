<template>
    <div>
        <h1> Archive: </h1>
        <div id="list_box">
            <Job 
                v-for="{id, done, register, text, user } in jobs" :key="id"

                v-bind:initialMessage=text
                initialColor='#00ccff'
                v-bind:ths=ths
                v-bind:dn=done
                v-bind:register=register
                v-bind:user=user
                v-bind:id=id
                v-bind:show=true
            /> 
        </div>
    </div>
</template>

<script>
import Job from "@/components/Job.vue";
import { db } from '@/firebase'

export default ({
    name: "archive",
    components: {
        Job,
    },
    data() {
        return {
            jobs: [],
            ths: this
        }
    },    
    created() {
        db.collection('Jobs').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if ( doc.data().register ) {
                    let item = doc.data()
                    item.id = doc.id
                    this.jobs.push(item)
                }
            })
        })
    },
})
</script>

<style lang="stylus">

</style>