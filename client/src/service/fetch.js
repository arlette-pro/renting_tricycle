import axios from "axios"

const prefix = "http://localhost:8000/api/v1"

/**
 * @param {string=} suffix
 * @returns
 */
export async function getData(suffix) {
    let url = prefix
    if (suffix) {
        url += `/${suffix}`
    }
    const response = await axios.get(
        url,
        { withCredentials: true},
    )
    return response.data
}

/**
 * @param {any} data
 * @param {string=} suffix
 * @returns
 */
export async function postData(data = {}, suffix) {
    let url = prefix
    if (suffix) {
        url += `/${suffix}`
    }
    const response = await axios.post(
        url,
        data,
        { withCredentials: true},
    )
    return response.data
}

/**
 * @param {LoginDto} info
 * @returns {Promise<{ user: User}>}
 */
export async function loginUser(info) {
    // sending login as the suffix means the entire url becomes `http://localhost:8000/api/v1/login`
    return postData(info, "login")
}

/**
 * @param {RegisterUserDto} info
 * @returns {Promise<{ message: string, newUser: User}>}
 */
export async function registerUser(info) {
    // sending login as the suffix means the entire url becomes `http://localhost:8000/api/v1/user/register`
    return postData(info, "user/register")
}

/**
 * @returns {Promise<{ users: User[] }>}
 */
export async function getUsers() {
    // sending login as the suffix means the entire url becomes `http://localhost:8000/api/v1/users`
    return getData("user")
}

/**
 * @param {AdminRegisterUserDto} info
 * @returns {Promise<{ user: User }>}
 */
export async function adminCreateUser(info) {
    // sending login as the suffix means the entire url becomes `http://localhost:8000/api/v1/user/register`
    return postData(info, "user")
}
