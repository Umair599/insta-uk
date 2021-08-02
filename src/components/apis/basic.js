import {INSTAGRAM_APP_ID, REDIRECT_URI} from './credentials';
import axios from 'axios';
export default axios.create({
    baseURL: 'https://api.instagram.com/oauth/authorize?client_id={INSTAGRAM_APP_ID}&redirect_uri={redirect-uri}&scope={scope}&response_type=code'
});