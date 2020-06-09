import Axios from 'axios'

export default {

    /*
    Получить данные из json файла и установить их для списка пользователей
    */        
       GET_PERSONAL_DATA_FROM_API({commit}){
        
        return Axios({
            url: 'http://localhost:3000/personal_data', 
            method: "GET"
        })
        .then((response) => {
            commit('SET_PERSONAL_DATA_TO_STATE', response.data);
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },

    POST_PERSONAL_DATA_FROM_API({commit}, data){
        Axios({
            url: 'http://localhost:3000/personal_data/'+data.id, 
            method: "PUT",
            data: JSON.stringify(data),
            headers: {
                // 'application/json' is the modern content-type for JSON, but some
                // older servers may use 'text/json'.
                // See: http://bit.ly/text-json
                'Content-type': 'application/json'
            }
        })
        .then((response) => {
            console.log('post = ', response.data);
            commit('SET_PERSONAL_DATA', response.data);
            return response.data;
        })
        .catch ((error) => {
            console.log(error);
            return error;
        })
        
    },

    DELETE_USER_FIELD_DB({commit}, data){
        console.log('actions delete = ', data)
        commit('SET_DELETE_USER_FIELD_DB', data)
        
    },

    EDIT_USER_FIELD_DB({commit}, data){
        commit('SET_EDIT_USER_FIELD_DB', data)
    },

    ADD_USER_FIELD_DB({commit}, data){
        commit('SET_ADD_USER_FIELD_DB', data)
    }

}

