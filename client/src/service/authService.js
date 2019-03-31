import axios from "axios";

export default class authService {

    constructor() {

        this.service = axios.create({
            baseURL: "http://localhost:5000/api/",
            withCredentials: true
        })
    }
    
    
    signup = (username, email,password,imageUrl) => {
        return this.service.post('signup', { username, email,password ,imageUrl})
            .then(res => res.data)
    }

    loggedin = () => {
        return this.service.get('loggedin')
            .then(res => res.data)
    }

    login = (email, password) => {
        return this.service.post('login', { email, password })
            .then(res => res.data)
    }

    logout = () => {
        return this.service.post('logout', {})
            .then(res => res.data)
    }
   
    getDataProfile = (imageUrl,username,email) => {
        return this.service.get('getDataUser',{imageUrl,username,email})
            .then(res => {
                //console.log(res.data)
                return res.data}
                )
    }

    getDataEvent = (location,data,hour,participants) => {
        
        return this.service.post('getDataE',{location,data,hour,participants})
        .then (res => res.data)
            
            //console.log(res.data)
        
    }

    

}

