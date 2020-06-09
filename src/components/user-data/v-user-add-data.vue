<template>

    <b-row class="align-items-center">
        <b-col cols="5" >
            <div class="text-right">
                <input class="form-control" v-model="user_name" >
             </div>
        </b-col> 
        <b-col cols="2">
            <div class="text-left">
                <input class="form-control" v-model="user_data" >
            </div>
        </b-col> 
        <b-col cols="5">
            <div class="text-left">
                <button class="button_user" @click="add_user_field"> Добавить </button> 
            </div>    
        </b-col>                         
    </b-row>

</template>

<script>

import { mapActions } from 'vuex'

export default {
    name: 'vUserAddData',
    components: {
        
    },
    props: {
        index: {
            type: Number
        }
    },

    data() {
        return {
            user_data: '',
            user_name: ''
        }
    },


    methods: {
        ...mapActions([
            'ADD_USER_FIELD_DB'
        ]),

        add_user_field(){

            if (this.user_data.trim()!='' && this.user_name.trim()!=''){

                this.ADD_USER_FIELD_DB([this.index, this.user_data, this.user_name]);
                this.user_data = '';
                this.user_name = '';
            }
        },
    }
}
</script>

<style>

</style>