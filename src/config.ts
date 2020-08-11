/**
 *   0 本地服务器   1 线上服务器
 */
const environment: number = 1;

let apiUrl!: string;
if (environment === 0) {
    apiUrl = 'http://localhost:9998';
} else {
    apiUrl = 'http://app.palxp.com:9998';
}

export default {
    VERSION: '0.0.3.beta',
    APP_COPYRIGHT: '',
    API_URL: apiUrl,
    IMG_URL: 'http://photo.palxp.com/',
    // login: 'http://  /login',
    // wx_redirectUri: 'http://localhost:8080'
    // wx_redirectUri: 'http://192.168.2.130:8080'
}
