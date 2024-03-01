import axios from "axios";
import {computed, signal} from "@preact/signals";

class HttpClient {
    api;
    STORAGE_KEY = "LOGIN_RESP";
    constructor(API_URL) {
        const current = sessionStorage.getItem(this.STORAGE_KEY) || localStorage.getItem(this.STORAGE_KEY)
        this.loginResponse = signal(current ? JSON.parse(current) : null)
        this.logged = computed(() => !!this.loginResponse.value)
        this.currentUser = computed(() => this.loginResponse.value?.user)
        this.token = computed(() => this.loginResponse.value?.token)
        this.api = axios.create({
            baseURL: API_URL,
        })
        this.api.interceptors.request.use((config) => {
            if (this.token.value) {
                config.headers = {
                    ...config.headers,
                    'Authorization': 'Bearer ' + this.token.value
                }
            }
            return config
        })
        this.api.interceptors.response.use(({data}) => data, (error) => {
            if(error.response.status === 403) this.logout()
            return Promise.reject(error)
        })
    }

    authenticate(endpoint, payload) {
        return this.api.post(endpoint, payload)
            .then(response => {
                this.loginResponse.value = response
                sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(response));
                if(payload.remember) {
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(response));
                }
            })
            .catch(() => this.logout())
    }
    logout() {
        this.loginResponse.value = undefined
        sessionStorage.clear()
        localStorage.clear()
    }
}

export const httpClient = new HttpClient("http://localhost:8080/")