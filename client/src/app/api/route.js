import axios from "axios";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const postOptions = (body) => ({ method: "POST", headers: myHeaders, credentials: 'include', redirect: 'follow', body: JSON.stringify(body) });

/* Session Routes */

export async function login(data) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/session`, data, { withCredentials: true });
        const result = response.data;
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function logout() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete("http://localhost:8000/api/session", { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

/* User */
export function register(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post("http://localhost:8000/api/user", data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function getUsers() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get("http://localhost:8000/api/user", { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

