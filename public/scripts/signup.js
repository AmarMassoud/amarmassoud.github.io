
document.addEventListener('DOMContentLoaded', async() => {

    localStorage.removeItem('currentUser');


    const signUpForm = document.getElementById('signup-form');
    signUpForm.addEventListener('submit', async (event) => {
        // window.location.href = '../seller/seller-dashboard.html';

        event.preventDefault(); // Prevent default form submission
        const name = document.getElementById('name').value;
        const role = document.getElementById('role').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const [firstName, lastName] = name.split(" ")
        const createAccount = await fetch(`/api/user`, {
            method: "POST",
            body: JSON.stringify(
                {
                    email: email,
                    password: password,
                    role: role,
                    firstName: firstName,
                    lastName: lastName,
                    balance: 0,
                    addresses: []
                }),
        });

        if (createAccount.ok) {
            const newUser = await createAccount.json();
            // console.log('User:', user);
            localStorage.setItem('currentUser', JSON.stringify(newUser.id));
            const role = newUser.id;
            if (role === 'CUSTOMER') {
                window.location.href = '/';
            } else if (role === 'SELLER') {
                window.location.href = '../seller-dashboard.html';
            }
            if (role === 'ADMIN') {
                window.location.href = '../admin.html';
            }
        } else {
            alert('Invalid email or password');
        }

        // if () {

        // } else {
        //     alert('Invalid email or password');
        // }
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