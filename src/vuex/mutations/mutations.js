import Vue from 'vue'

export default

{
    SET_PERSONAL_DATA_TO_STATE: (state, personal_data) => {
        state.personal_data = personal_data;
    },

    SET_PERSONAL_DATA: (state, personal_data) => {
        console.log(personal_data);
    },

    SET_DELETE_USER_FIELD_DB: (state, data) => {
        let index = data[0];
        let field= data[1];
        Vue.delete(state.personal_data[index], field);
    },

    SET_EDIT_USER_FIELD_DB: (state, data) => {
        let index = data[0];
        let field_data = data[1];
        let field = data[2];

        console.log('Новое значение поля = ', field_data);
        console.log('Индекс пользователя = ', index);
        console.log('Имя поля = ', field);

        Vue.set(state.personal_data[index][field], 'data', field_data);

        console.log(state.personal_data[index][field]);

    },

    SET_ADD_USER_FIELD_DB: (state, data) => {
        let index = data[0];
        let field_data = data[1];
        let field_name = data[2];
        let ms = new Date();
        let field = 'user_field'+ms.getTime();
        console.log(field); 

        //state.personal_data[index][field]={"data":"", "name":""};
        Vue.set(state.personal_data[index], [field], {"data":"", "name":""});
        Vue.set(state.personal_data[index][field], 'data', field_data);
        Vue.set(state.personal_data[index][field], 'name', field_name);

        console.log('after add field = ', state.personal_data[index]);
    }

}