import {INSTAGRAM_APP_ID, REDIRECT_URI} from './credentials';
import axios from 'axios';
export default axios.create({
    baseURL: `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`
});