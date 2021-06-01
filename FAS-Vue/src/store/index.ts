import { createStore } from 'vuex'
import axios from 'axios'
import { ILoginResponse } from '@/types/ILoginResponse';

export interface IState {
    token: string | null;
    firstname: string;
    lastname: string;
    role?: string;
}

export const initialState: IState = {
    token: null,
    firstname: '',
    lastname: '',
    role: ''
}

export interface ILoginInfo {
    email: string;
    password: string;
}

export default createStore({
    state: initialState,
    mutations: {
        logOut: (state: IState) => {
            state.token = null;
            state.firstname = '';
            state.lastname = '';
            state.role = '';
        },
        logIn: (state: IState, loginResponse: ILoginResponse) => {
            state.token = loginResponse.token;
            state.firstname = loginResponse.firstname;
            state.lastname = loginResponse.lastname;
            state.role = loginResponse.role;
        },
    },
    actions: {
    },
    getters: {
    },
    modules: {
    }
})
