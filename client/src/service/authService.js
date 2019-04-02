import axios from "axios";

export default class authService {

    constructor() {

        this.service = axios.create({
            baseURL: "http://localhost:5000/api/",
            withCredentials: true
        })
    }
    
    
    signup = (username, email,password,imageUrl) => {
        console.log(imageUrl)
        const uploadData = new FormData();
        uploadData.append("photo", imageUrl[0]);
        uploadData.append("username", username);
        uploadData.append("email", email);
        uploadData.append("password", password);

        console.log(uploadData)
        return this.service.post('signup', uploadData)
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
   
    getDataProfile = () => {
        return this.service.get('getDataUser')
            .then(res => {
                //console.log(res.data)
                return res.data}
                )
    }

    getDataEvent = (location,center,data,hour,participants,comments) => {
        
        return this.service.post('getDataE',{location,center,data,hour,participants,comments})
        .then (res => res.data)
            
            //console.log(res.data)
        
    }

    
    getOneEvent = idEvent=> {
        const pro = this.service.get(`getOneEvent/${idEvent}`,{ withCredentials: true })
        .then( res => {
            return res.data
        })
        .catch(err => { 
            console.log(err)
        })
        return pro
    }
    
    getEvents = () => {

        const pro = this.service.get('getAllEvents' ,{ withCredentials: true })
        .then( res => {
            //console.log(res.data)
            
            return res.data
        })
        .catch(err => { 
            console.log(err)
        })
        return pro
    } 
    
    getCenters = () => {
        const pro = this.service.get('getAllCenters' ,{
            withCredentials: true })
            .then( res => {
                console.log(res.data)
                return res.data
            })
            .catch( err => {
                console.log(err)
            })
        return pro 
    }
    
    getDataCenter = () => {

        return this.service.get('getAllCenters')
        .then (res => res.data)
            
        
    }

    getCenter = (distrito) => {
        return this.service.post('getCenters', {distrito})
        .then(response => response.data);
    }
    
}

