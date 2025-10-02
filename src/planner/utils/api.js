// src/planner/utils/api.js

const API_URL = "http://localhost:5000/api";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function getTasks(token) {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function addTask(token, data) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function toggleTask(token, id) {
  const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function deleteTask(token, id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function getCourses(token) {
  const res = await fetch(`${API_URL}/courses`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function addCourse(token, data) {
  const res = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteCourse(token, id) {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function getSubjects(token) {
  const res = await fetch(`${API_URL}/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function addSubject(token, name) {
  const res = await fetch(`${API_URL}/subjects`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name })
  });
  return res.json();
}

export async function deleteSubject(token, id) {
  const res = await fetch(`${API_URL}/subjects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
