export default function getPhotos() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "/getPhotos");
    xhr.onload = (e) => {
      resolve(JSON.parse(e.target.response));
    };
    let token = localStorage.getItem("token");
    xhr.setRequestHeader("authorization", token);
    xhr.send();
  });
}
