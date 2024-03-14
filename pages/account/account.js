document.addEventListener('DOMContentLoaded', async() => {
    const response = await fetch('https://dummyjson.com/users');
    let users = [];
    if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        if (Array.isArray(responseData.users)) {
            users = responseData.users;
            console.log('Users data:', users);
        } else {
            console.error('Invalid users data format:', responseData);
            return;
        }
    } else {
        console.error('Failed to fetch users data');
        return;
    }

    const form = document.getElementById('login-form');
    form.addEventListener('submit', (event) => {
        // window.location.href = '../seller/seller-dashboard.html';

        event.preventDefault(); // Prevent default form submission
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let user = users.find((user) => user.email === email && user.password === password);
        if (user != null) {
            window.location.href = '../seller/seller-dashboard.html';
        } else {
            alert('Invalid email or password');
        }
    });

    const signUpForm = document.getElementById('signup-form');
    form.addEventListener('submit', (event) => {
        // window.location.href = '../seller/seller-dashboard.html';

        event.preventDefault(); // Prevent default form submission
        const name= document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let user = users.find((user) => user.email === email && user.password === password);
        if (user != null) {
            window.location.href = '../seller/seller-dashboard.html';
        } else {
            alert('Invalid email or password');
        }
    });








});