document.addEventListener('DOMContentLoaded', async() => {



    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (event) => {
        // window.location.href = '../seller/seller-dashboard.html';

        event.preventDefault(); // Prevent default form submission
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const validateLogin = await fetch(`/api/login`, {
            method: "POST",
            body: JSON.stringify(
                {
                    email: email,
                    password: password
                }),
                });
        if (validateLogin.ok) {
            const response = await validateLogin.json();
            console.log(response)

        if (response.message === "Login successful") {
            const userId = response.userId;
            showToast("Logging in", "bgd-custom-green")
            localStorage.setItem('currentUser', JSON.stringify(userId));
            const getUser = await fetch(`/api/user/${userId}`, {
                method: "GET",
                mode: 'no-cors',
            });
            console.log(getUser)
            if (getUser.ok) {
                user = await getUser.json();
                if (user.role === 'CUSTOMER') {
                    window.location.href = '/';
                    console.log('User:', user);
                } else if (user.role === 'SELLER') {
                    window.location.href = '../seller-dashboard.html';
                }
                if (user.role === 'ADMIN') {
                    window.location.href = '../admin.html';
                }
            }
            // window.location.href = '../../pages/seller/seller-dashboard.html';
        } else {
            showToast('Invalid email or password', 'bg-custom-red')
            email.value = "";
            password.value = "";
        } }
    });


    const showToast=(message, color)=>{
        const toastContainer = document.getElementById('toast-container');
        toastContainer.classList.remove('hidden');
        const toastAlert= document.querySelector('#toast-alert');
        toastAlert.textContent=message;
        toastAlert.classList.remove('bg-gray-100');
        toastAlert.classList.add(color);
    
        setTimeout(() => {
          toastContainer.classList.add('hidden');
        }, 3000);
    }








});