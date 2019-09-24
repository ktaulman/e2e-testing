import axios from 'axios';

export const postData=(data)=>{
    axios.post('http://localhost:3000/api/user',data)
}