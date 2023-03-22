import request from "./index.js";
export function getBooks(params) {
  return request.post("/books/getBooks", params);
}
export function register(params) {
  return request.post("/account/reg", params);
}
export function login(params) {
  return request.post("account/login", params);
}
export function getAlrRecUserList(params) {
  return request.post("words/getAlrRecUserList", params);
}
export function getDonRecUserList(params) {
  return request.post("words/getDonRecUserList", params);
}
export function getUnreadUserList(params) {
  return request.post("words/getUnreadUserList", params);
}


