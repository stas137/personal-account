<template>

    <b-row class="align-items-center">

        <vPopupDeleteField v-if="isPopupDeleteVisible"
            v-bind:msg_popup="msg_popup"
            v-bind:name_popup="name_popup"
            v-bind:field_name="name"
            v-bind:index="index"
            @closePopup="close_popup"
            @deletePopup="delete_popup"            
        >
        </vPopupDeleteField>


        
            <b-col cols="5" >
                <div class="text-right" v-if="name!='id'">
                    {{this.value.name}}:
                </div>
            </b-col> 
            <b-col cols="2">
                <div class="text-left" v-if="!isEditUser && name!='id'" >
                    {{this.value.data}}
                </div>
                <div class="text-left" v-else-if="name!='id' && isEditUser">
                    <input class="form-control" v-model="user_field_comp" >
                </div>
            </b-col> 
            <b-col cols="5">
                <div v-if="name!='id'">
                <div class="text-left" v-if="!isEditUser">
                    <button class="button_user" @click="edit_user_field"> Редактировать </button> 
                    <div class="text-left div_button" v-if="name!='user_login' && name!='user_password'">
                        <button class="button_user" @click="delete_user_field"> Удалить </button>
                    </div>
                </div>    
                <div class="text-left" v-else>
                    <button class="button_user" @click="save_user_field"> Принять </button> 
                    <button class="button_user" @click="back_user_field"> Отмена </button>
                </div>    
                </div>        
            </b-col>                         
        </b-row>


</template>

<script>

import vPopupDeleteField from '../popup/v-popup-delete_field'
import { mapActions } from 'vuex'

export default {
    name: 'vUserData',
    components: {
        vPopupDeleteField
    },
    props: {
        value: {},
        name: {
            type: String
        },
        index: {
            type: Number
        }
    },

    data() {
        return {
            isEditUser: false,
 
            new_user_field_data: '',
            
            isPopupDeleteVisible: false,

            msg_popup: '',
            name_popup: ''
        }
    },

    computed: {

        user_field_comp: {
            get() {
                if (this.new_user_field_data!=''){
                    return this.new_user_field_data;
                } else {
                    return this.value.data;
                }
                
            },
            set(newValue) {
                if (newValue.trim()!=''){
                    this.new_user_field_data = newValue.trim();
                } 
            }
        }
    },

    methods: {
        ...mapActions([
            'EDIT_USER_FIELD_DB',
            'DELETE_USER_FIELD_DB',
        ]),

        edit_user_field(){

            this.isEditUser = true;
        },

        back_user_field(){

            this.isEditUser = false;
 
        },

        save_user_field(){

            console.log('Новое значение поля = ', this.new_user_field_data);
            console.log('Индекс пользователя = ', this.index);
            console.log('Имя поля = ', this.name);
            

            if (this.user_field_comp!=''){
                this.EDIT_USER_FIELD_DB([this.index, this.user_field_comp, this.name]);        
            } else {
                this.EDIT_USER_FIELD_DB([this.index, this.value.data, this.name]);
            }
            this.isEditUser = false;

            console.log('ccc');

        },

        delete_user_field(){
           
            this.name_popup = 'Удаление';
            this.msg_popup = 'Удалить поле '+ this.value.name +' пользователя: "'+ this.value.data +'" ?';
            console.log('delete user index = ', this.index)
            this.isPopupDeleteVisible = true;
        },

        close_popup(){
            this.isPopupDeleteVisible = false;
        },

        delete_popup(){
            this.isPopupDeleteVisible = false;
        }
    }

}
</script>

<style>


.button_user {
  padding: 3px;

  min-width: 120px;
 
  background-color: cornflowerblue;

  border: 0;
  border-radius: 3px 3px 3px 3px;

  margin-left: 5px;
  margin-right: 5px;

  margin-top: 5px;
  margin-bottom: 5px;

  cursor: pointer;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.align-items-center {
    align-items:center;
}

.div_button{
    display: inline-block;
}

</style>