





import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL: "http://172.18.0.40", // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})


export function fetchURL(url_str) {

    console.log("here")

    return service({
        url: '/spider/query',
        method: 'get',
        params: {
            url:url_str
        }
    })
}


