import {apiUrl} from '../constants/type';
class Api {
    static headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    static fileHeadertpions = {
        'Authorization': "Bearer " + localStorage.userJWT
    }

    static get(route) {
        return this.xhr(route, null, 'GET');
    }

    static put(route, params) {
        return this.xhr(route, params, 'PUT')
    }

    static post(route, params) {
        return this.xhr(route, params, 'POST')
    }

    static delete(route, params) {
        return this.xhr(route, params, 'DELETE')
    }

    static xhr(route, params, verb) {
        const url = `${apiUrl}${route}`;
        let formData;
        let options = Object.assign({ method: verb });
        if (params && (params.file || params.logo || params.successStory)) {
            console.log(params.successStory,"signUp.storiesFile")
            options.headers = Api.fileHeadertpions;
            formData  = new FormData();
            console.log(params,"formdata")
         
            for(let name in params) {
                console.log(name,"name")
                if(name != 'successStory'){
                    formData.append(name, params[name]);
                }
            }
            if(params.successStory.length > 1){
                for(var i = 0; i < params.successStory.length; i++) {
                    formData.append(`successStory[${i}]`, params.successStory[i]);
                }
            }
        } else {
            console.log("dddd")
            options.headers = Api.headers();
            params && delete params.file
            formData = JSON.stringify(params)
        }
        options = Object.assign(options, params ? { body: formData } : null);
        if (localStorage.userJWT) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${localStorage.userJWT}`
            }
        }
        return fetch(url, options).then(resp => {
            let json = resp.json();
            if (resp.ok) {
                return json
            }
            return json.then(err => { throw err });
        }).then(json => json);
    }
}

export default Api;
