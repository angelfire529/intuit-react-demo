import axios from 'axios';
import { resolve } from 'url';

export default {
    GetContacts() {
         let promise = new Promise((resolve) => {
            axios.get('contacts.json').then(resp => {
                resp.data.map(d => {
                    d.collapse = false;
                })
                resolve(resp)
            })
         })

         return promise;
    }
} 