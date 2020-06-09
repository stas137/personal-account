<template>
  <div class="v-popup__wrapper">
    <div class="v-popup">

      <div class="v-popup__header">
        <span>{{ name_popup }}</span>
        <span><i class="material-icons" @click="closePopup">close</i>
        </span>
      </div>

      <div class="v-popup__content">
        <span>{{ msg_popup }}</span>
      </div>

      <div class="v-popup__footer">
          <button class="button_modal" v-on:click="closePopup">Ok</button>
      </div>

    </div>
   </div>
</template>

<script>


export default {

  name: 'vPopup',
  props: {
    msg: {
      type: String
    },
    name_popup: {
      type: String
    },
    msg_popup: {
      type: String
    }

  },

  data() {
    return {

    } 
  },

  methods: {
    closePopup() {
      this.$emit("closePopup");
    }
  },

  mounted() {}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>

.v-popup__wrapper{
  display: flex;
  flex-direction: row;
  justify-content: center; /*главная ось*/
  align-items: center;     /*поперечная ось*/

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background: rgba(39, 39, 39, 0.25);

  z-index: 9999;
}

.v-popup {
  position: fixed;
  top: 150px;


  background: white;

  box-shadow: 0 0 15px 0 #151515;
  border-radius: 5px 5px 5px 5px;
  width: 350px;
}


.v-popup__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 10px;
  background: rgb(198, 226, 176);

  border-radius: 5px 5px 0px 0px;
}

.v-popup__content {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 25px;
}

.v-popup__footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button_modal {
  padding: 10px;
  width: 50%;

  background-color: cornflowerblue;

  border: 0;
  border-radius: 3px 3px 3px 3px;

  margin-bottom: 20px;

  cursor: pointer;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.material-icons {
  cursor: pointer;
}

</style>
