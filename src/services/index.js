import axios from "axios"

const BASE_URL = "https://todo.api.devcode.gethired.id"

// activity
export async function getAllActivity() {
    return await axios.get(`${BASE_URL}/activity-groups?email=eefmekel@gmail.com`).catch((error) => {
        return error;
    })
}

export async function addNewActivity(payload) {
    return await axios.post(`${BASE_URL}/activity-groups`, payload).catch((error) => {
        return error;
    })
}

export async function updateActivity(id, payload) {
    return await axios.patch(`${BASE_URL}/activity-groups/${id}`, payload).catch((error) => {
        return error;
    })
}

export async function deleteActivity(id) {
    return await axios.delete(`${BASE_URL}/activity-groups/${id}`).catch((error) => {
        return error;
    })
}

// todo item
export async function getAllTodo(id) {
    return await axios.get(`${BASE_URL}/todo-items?activity_group_id=${id}`).catch((error) => {
        return error;
    })
}

export async function addNewTodoItem(payload) {
    return await axios.post(`${BASE_URL}/todo-items`, payload).catch((error) => {
        return error;
    })
}

export async function updateTodoItem(id, payload) {
    return await axios.patch(`${BASE_URL}/todo-items/${id}`, payload).catch((error) => {
        return error;
    })
}

export async function deleteTodoItem(id) {
    return await axios.delete(`${BASE_URL}/todo-items/${id}`).catch((error) => {
        return error;
    })
}
