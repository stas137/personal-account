<template>
  
  <b-container class="v-login">

    <vPopup v-if="isPopupVisible"
      v-bind:msg_popup="msg_popup"
      v-bind:name_popup="name_popup"
      @closePopup="close_popup"
    >
    </vPopup>

    <b-row>
      <b-col>
        <h2>Личный кабинет</h2>
        <p>Пользователь №1 (Логин и пароль: "123")</p>
        <p>Пользователь №2 (Логин и пароль: "1234")</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <hr />
      </b-col>
    </b-row>

    <b-row class="align-items-center">
        <b-col cols="6" >
            <div class="text-right">
                Логин пользователя:
            </div>
        </b-col> 
        <b-col cols="3">
            <div class="text-left">
                <input type="text" class="form-control" placeholder="Введите логин" v-model="user_login" id="user_login">
            </div>
        </b-col> 
        <b-col cols="3">
            <div class="text-left">
                
            </div>
        </b-col> 
    </b-row>

    <b-row class="align-items-center">
        <b-col cols="6" >
            <div class="text-right">
                Пароль пользователя:
             </div>
        </b-col> 
        <b-col cols="3">
            <div class="text-left">
              <input class="form-control" placeholder="Введите пароль" v-model="user_password" id="user_password" type="password">
            </div>
        </b-col> 
        <b-col cols="3">
            <div class="text-left">
                
            </div>
        </b-col>
    </b-row>
   
    <b-row>
      <b-col>
        <button class="button_modal_login" @click="check_user">Войти</button>
      </b-col>
    </b-row>

    
  </b-container>
</template>

<script>

import vPopup from './popup/v-popup'
import { mapActions, mapGetters } from 'vuex'

export default {

  name: 'vLogin',
  components: {
    vPopup
  },
  props: {
  },

  data() {
    return {
      user_login: '',
      user_password: '',
      isPopupVisible: false,
      isPersonalAccount: false,
      name_popup: '',
      msg_popup: ''
    } 
  },

  methods: {
    ...mapActions([
      'GET_PERSONAL_DATA_FROM_API'
    ]),

    success_check(user, index) {
      console.log('success_check');
      this.$router.push({name: 'personal_account', params: {user: user, index: index}});
    },

    check_user() {

      this.user_login = this.user_login.trim();
      this.user_password = this.user_password.trim();

      if (this.user_login != ''){
        console.log('Логин = ', this.user_login)
        console.log('Пароль = ', this.user_password)

        let user_exist = false;
        let user_index = -1;

        for (let i=0; i<this.PERSONAL_DATA.length; i++){
          console.log(this.PERSONAL_DATA[i].user_login)
          if (this.user_login == this.PERSONAL_DATA[i].user_login.data){
            user_exist = true;
            user_index = i;
            break;
          }
        }

        if (user_exist){

          if (this.user_password != this.PERSONAL_DATA[user_index].user_password.data){
            this.show_enter_data("Вход в личный кабинет", "Для пользователя с именем '" + this.user_login + "' введен не правильный пароль");
          } else {
            this.isPersonalAccount = true;
            this.success_check(this.PERSONAL_DATA[user_index], user_index);
          }
        } else {
          this.show_enter_data("Вход в личный кабинет", "Пользователь с именем '" + this.user_login + "' не найден");
        }

      } else {
        if (this.user_login.trim().length == 0){
          this.show_enter_data("Вход в личный кабинет", "Введите имя пользователя ");
        } else {
          if (this.user_password.trim().length == 0){
            this.show_enter_data("Вход в личный кабинет", "Введите пароль для пользователя '" + this.user_login + "'");
          }
        }
      }

    },

    show_enter_data(name_popup, msg_popup){
      this.isPopupVisible = true;
      this.name_popup = name_popup;
      this.msg_popup = msg_popup;
    },

    close_popup(){
      this.isPopupVisible = false;
    }

  },

  computed: {
    ...mapGetters([
      'PERSONAL_DATA'
    ])
  },

  mounted() {
    this.GET_PERSONAL_DATA_FROM_API().then((response) => {
      if (response.data){
        console.log('response data = ', response.data);
        console.log('personal data = ', this.PERSONAL_DATA);
      }
    })
    
  }

}
</script>

<style>

hr {
  width: 45%;
}

.button_modal_login {
  padding: 10px;
  width: 20%;
  

  background-color: cornflowerblue;

  border: 0;
  border-radius: 3px 3px 3px 3px;

  margin-top: 50px;
  margin-bottom: 20px;

  cursor: pointer;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.row {
  margin-top: 5px;
}

</style>
