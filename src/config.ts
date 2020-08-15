/**
 *   0 本地服务器   1 线上服务器
 */
const environment: number = 1

let apiUrl!: string
let MUSIC_URL!: string

if (environment === 0) {
    apiUrl = 'http://localhost:9998'
    MUSIC_URL = 'http://localhost:9997'
} else {
    apiUrl = 'http://app.palxp.com:9998'
    MUSIC_URL = 'http://app.palxp.com:9997'
}

export default {
    VERSION: '0.0.3.beta',
    APP_COPYRIGHT: '',
    API_URL: apiUrl,
    IMG_URL: '',
    MUSIC_URL
}
