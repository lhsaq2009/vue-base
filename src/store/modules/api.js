const BASE_URL = process.env.VUE_APP_BASE_API

const api = {
    state: {
        qiNiuUploadApi: BASE_URL + '/qiniu/upload',
    }
}

export default api;
