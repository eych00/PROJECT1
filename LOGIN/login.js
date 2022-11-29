const login = async (event) => {
    event.preventDefault()
const formData = {
    email: document.getElementById('emailInput').value,
    password: document.getElementById('passwordInput').value
}
const response = await fetch('/login', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
        },
            body: JSON.stringify(formData) 
    });
console.log(response)
    if(response.status === 200) {
        window.location = '/LOGIN'
    }
}
    
    const signInButton = document.getElementById("signInButton");
    
    signInButton.addEventListener('click', login)      
    
function showSignup() 
    signin.style.display = "none";
    signup.style.display = "block";
            
function hideSignup() 
    signin.style.display = "block";
    signup.style.display = "none";
