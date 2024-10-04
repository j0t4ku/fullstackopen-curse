import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

export const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
        .catch(e => console.log(e))
}