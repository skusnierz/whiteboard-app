import axios from "axios";
import Cookies from "js-cookie";

import { Room } from "../model/room";
import { User } from "../model/user";
import { userLoginInput } from "./../model/user";

const API_SERVER_URL = "http://192.168.0.97:8080";

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

const loginUser = async (user: userLoginInput): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios
            .post(API_SERVER_URL + "/user/login", user)
            .then((res) => {
                const { message, token, username } = res.data;
                console.log(message);
                Cookies.set("token", token);
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

const getRooms = async (): Promise<Room[]> => {
    return new Promise((resolve, reject) => {
        axios
            .get(API_SERVER_URL + "/room", {
                headers: {
                    Authorization: Cookies.get("token")
                }
            })
            .then((res) => {
                resolve(res.data);
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

const roomExist = async (name: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axios
            .get(API_SERVER_URL + "/room/" + name, {
                headers: {
                    Authorization: Cookies.get("token")
                }
            })
            .then((res) => {
                resolve(res.data.roomExist);
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

const getUserRooms = async (): Promise<Room[]> => {
    return new Promise((resolve, reject) => {
        axios
            .get(API_SERVER_URL + "/rooms", {
                headers: {
                    Authorization: Cookies.get("token")
                }
            })
            .then((res) => {
                resolve(res.data);
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

const deleteRoom = async (name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        axios
            .delete(API_SERVER_URL + "/room", {
                data: {
                    name
                },
                headers: {
                    Authorization: Cookies.get("token")
                }
            })
            .then((res) => {
                resolve(res.data);
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
    getUsername,
    getRooms,
    roomExist,
    getUserRooms,
    deleteRoom
};
