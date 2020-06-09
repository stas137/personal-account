<template>

    <b-container class="v-personal_account">

        <b-row class="align-items-center">
            <b-col cols="5" >
                <div class="text-right">
                    <strong>{{title_search}}</strong>    
                </div>
            </b-col> 
            <b-col cols="5">
                <div class="text-left">
                    <input class="form-control" v-model="search" >
                </div>
            </b-col> 
                      
        </b-row>

        <vUserData 
            v-for="(value, name) in user_comp"
            v-bind:key="name"
            v-bind:value="value"
            v-bind:name="name"
            v-bind:index="index_comp"
        >
        </vUserData>

        <vUserAddData 
            v-bind:index="index_comp"
        >
        </vUserAddData>

        <button class="button_modal_personal" @click="save_changes"> Сохранить </button>

         <router-link :to="{name:'login'}">
            <button class="button_modal_personal"> Выйти </button>
        </router-link>

    </b-container>

</template>

<script>

import vUserData from './user-data/v-user-data'
import vUserAddData from './user-data/v-user-add-data'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'vPersonalAccount',
    components: {
        vUserData,
        vUserAddData
    },
    props: {
        user: {
            type: Object
        },
        index: {
            type: Number
        }
    },

    data() {
        return {
            user_data: '',
            user_name: '',
            title_search: 'Поиск:',
            search: ''
        }
    },

    computed: {
        ...mapGetters([
            'PERSONAL_DATA'
        ]),

        user_comp: {
            get() {
                let obj;

                if (this.user!=null) {
                    obj = this.user;
                } else {
                    obj = this.PERSONAL_DATA[localStorage.getItem('index')]
                    
                }
                
                let new_obj = {};

                for (let key in obj){
                    let el = obj[key];
                    const search_to_lower = this.search.toLowerCase();
                    if (key!='id'){
                        //console.log('ключ = ', key);
                        //console.log('элемент = ', el.data);
                        if (el.data.toLowerCase().indexOf(search_to_lower)!= -1){
                            new_obj[key] = el;
                        }
                    }
                }
            return new_obj;
            }
        },

        index_comp: {
            get() {
                if (this.index!=null){
                    return this.index
                } else {
                    return JSON.parse(localStorage.getItem('index'))
                }
            }
        }
    },

    methods: {
        ...mapActions([
            'ADD_USER_FIELD_DB',
            'POST_PERSONAL_DATA_FROM_API',
            'GET_PERSONAL_DATA_FROM_API',
            'SET_USER_INDEX_DATA'
        ]),

        add_user_field(){

            if (this.user_data.trim()!='' && this.user_name.trim()!=''){

                this.ADD_USER_FIELD_DB([this.index, this.user_data, this.user_name]);
                this.user_data = '';
                this.user_name = '';
            }
        },

        save_changes(){
            if (this.user!=null){
                console.log('user = ', this.user);
                console.log('db.json = ', {"personal_data": this.PERSONAL_DATA});
                this.POST_PERSONAL_DATA_FROM_API(this.user);              
            } else {
                console.log('local = ', {"personal_data": this.PERSONAL_DATA});
                this.POST_PERSONAL_DATA_FROM_API(this.PERSONAL_DATA[JSON.parse(localStorage.getItem('index'))]);                 
            }

        },

        save_to_localStorage(name, data){
          const parsed = JSON.stringify(data);
          localStorage.setItem(name, parsed);
          console.log('data ' + name + ' saved', 'parsed = ', parsed);
        },
    },
    
    mounted(){
        if (this.user){
            console.log('user mounted')
            this.save_to_localStorage('index', this.index)
            
        }
        else {
            this.GET_PERSONAL_DATA_FROM_API().then((response) => {
                if (response.data){
                    console.log('response data = ', response.data);
                }
            })
            
        }
    },

    updated() {
        console.log('user update')
    },
}
</script>

<style>

.button_modal_personal {
  padding: 5px;
  width: 15%;
  
  background-color: cornflowerblue;

  border: 0;
  border-radius: 3px 3px 3px 3px;

  margin-left: 5px;
  margin-right: 5px;

  margin-top: 30px;
  margin-bottom: 5px;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.align-items-center {
    align-items: center;
}

</style>