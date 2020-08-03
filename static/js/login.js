
const submitBtn = document.querySelector('.loginStyle')
const username = document.querySelector('[name=username]')
const pwd = document.querySelector('[name=pwd]')

submitBtn.addEventListener("click", ()=>{
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", pwd.value);

  const xhr = new XMLHttpRequest()
  xhr.open("post", "/login")
  xhr.onload = ()=>{
    const result = JSON.parse(xhr.response)
    if (result.code === 1) {
      localStorage.setItem("token", "Bearer " + result.msg.token)
      localStorage.setItem("username", result.msg.username)
      window.location.href = "/photo.html"
    }else{
      alert(result.msg)
    }
  }
  xhr.send(formData)
})

