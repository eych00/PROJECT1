
windiw.addEventListener('load',()=>{

})
const url ='http://localhost:3000/api/user/register'

const regForm = document.querySelector("#regform")

regForm.addEventListener('submit', async e => {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    const user = JSON.stringify({"email":email,"password":password})

    fetch(url, {
        method: "POST",
        body: user,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then(response => response.json())
    .then(data => {
        window.location('/LOGIN/login.html')
    })
})