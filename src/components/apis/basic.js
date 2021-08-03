import {INSTAGRAM_APP_ID, REDIRECT_URI, INSTAGRAM_APP_SECRET} from './credentials';
import axios from 'axios';
export default axios.create({
    baseURL: 'https://api.instagram.com/oauth'
});
