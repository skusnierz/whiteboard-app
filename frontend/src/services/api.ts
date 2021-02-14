import axios from "axios";
import Cookies from "js-cookie";

const API_SERVER_URL = "http://192.168.0.97:8080";

interface User {
    username: string;
    email: string;
    password: string;
}

interface loginInput {
    email: string;
    password: string;
}

const registerUser = async (user: User): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios
            .post(API_SERVER_URL + "/user", user)
            .then((res) => {
                console.log(res);
                resolve("");
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                    reject(err.response.data.message);
                } else {
                    reject("Connection refused !");
                }
            });
    });
};

const loginUser = async (user: loginInput): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios
            .post(API_SERVER_URL + "/user/login", user)
            .then((res) => {
                const { message, token } = res.data;
                console.log(message);
                Cookies.set("token", token);
                resolve("");
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                    reject(err.response.data.message);
                } else {
                    reject("Connection refused !");
                }
            });
    });
};

const getUsername = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios
            .get(API_SERVER_URL + "/user", {
                headers: {
                    Authorization: Cookies.get("token")
                }
            })
            .then((res) => {
                const { username } = res.data;
                console.log(username);
                resolve(username);
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                    reject(err.response.data.message);
                } else {
                    reject("Connection refused !");
                }
            });
    });
};

export const apiProvider = {
    registerUser,
    loginUser,
    getUsername
};
