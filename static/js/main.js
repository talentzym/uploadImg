import PreviewImg from './PreviewImg.js'
import ShowImg from "./ShowImg.js";
import upload from "./api/upload.js";
import getPhotos from "./api/get-photos.js";


const imgFile = document.querySelector('.imgFile')
const imgFileAdd = document.querySelector(".imgFile-add")
const loadContainer = document.querySelector(".loadContainer")
const showContainer = document.querySelector(".showContainer")
const photoContainer = document.querySelector('.photoContainer')
const username = document.querySelector(".username")
const signOut = document.querySelector(".sign-out")
const uploadBtn = document.querySelector(".uploadBtn")

let uploadImgList = [];

(async () => {
  // 渲染
  renderPhotoList();
  
})();
async function renderPhotoList () {
  photoContainer.innerHTML = ``;
  const res = await getPhotos();
  const data = res.data;
  if (data) {
    data.forEach((photoInfo) => {
      new ShowImg(photoInfo);
    });
  }
  username.innerText = localStorage.getItem("username")
}


uploadBtn.addEventListener("click", ()=>{
  uploadResult()
  // 上传完成
  uploadCompleted()
  
})

async function uploadResult () {
  let arr = []
  // forEach 不等待 await
  for (let previewImg of uploadImgList) {
    const result = await upload(previewImg)
    arr.push(result)
  }
  if (isSuccess) {
    closeMasking()
  }
}
function isSuccess(arr){
  return arr.every(item=>item.code==='200')
}

function uploadCompleted () {
  reset()
}
function reset () {
  hideLoadContainer()
  uploadImgList = []
  document.querySelector(".wantUpload").innerHTML = ``
}
function closeMasking(){
  document.querySelector(".masking").style.display = "none";
  renderPhotoList()
}

signOut.addEventListener("click", (e)=>{
  localStorage.clear()
  window.location.href="/login.html"
})

imgFile.addEventListener("change", (e)=>{
  renderPreviewImg(e.target.files)
})

imgFileAdd.addEventListener("change", (e)=>{
  renderPreviewImg(e.target.files)
})

function renderPreviewImg (files) {
  const filesList = Array.from(files)

  filesList.forEach(file => {
    let previewImg = new PreviewImg(file)
    uploadImgList.push(previewImg)
  });
  showLoadContainer()
}


function showLoadContainer () {
  loadContainer.style.display = "block"
  showContainer.style.display = "none"
}

function hideLoadContainer () {
  loadContainer.style.display = "none"
  showContainer.style.display = "block"
}

document.querySelector(".close").onclick = function () {
  closeMasking()
};
document.querySelector(".mybtn").onclick = function () {
  document.querySelector(".masking").style.display = "block";
};
