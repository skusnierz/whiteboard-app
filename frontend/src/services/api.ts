import axios from "axios";
import Cookies from "js-cookie";

import { Line, Room, User, userLoginInput } from "../model/model";

const API_SERVER_URL = "http://192.168.0.97:8080";

const registerUser = (user: User): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios
            .post(API_SERVER_URL + "/users", user)
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

const loginUser = (user: userLoginInput): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios
            .post(API_SERVER_URL + "/users/login", user)
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

const getUsername = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios
            .get(API_SERVER_URL + "/users", {
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

const getRooms = (): Promise<Room[]> => {
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

const roomExist = (name: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axios
            .get(API_SERVER_URL + "/rooms/" + name, {
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

const getUserRooms = (): Promise<Room[]> => {
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

const deleteRoom = (name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        axios
            .delete(API_SERVER_URL + "/rooms", {
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

const getLines = (roomName: string): Promise<Line[]> => {
    return new Promise((resolve, reject) => {
        axios
            .get(API_SERVER_URL + "/lines/" + roomName, {
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
    deleteRoom,
    getLines
};
