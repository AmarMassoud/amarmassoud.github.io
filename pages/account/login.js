document.addEventListener('DOMContentLoaded', async() => {
    let users = [];
    localStorage.removeItem('currentUser');

    const usersData = localStorage.getItem('user');
    users = JSON.parse(usersData);
    

    if (!localStorage.getItem('user')) {
    const response = await fetch('../../data/users.json');
    if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        if (Array.isArray(responseData)) {
            
            localStorage.setItem('user', JSON.stringify(responseData));
            const usersData = localStorage.getItem('user');
            users = JSON.parse(usersData);
            console.log('Users data:', users);



        } else {
            console.error('Invalid users data format:', responseData);
            return;
        }
    } else {
        console.error('Failed to fetch users data');
        return;
    }}
   console.log('Users data:', users);

    // users.forEach((user, index) => {
    //     if (index < 10) {
    //         user.role = "SELLER"
    //     } else if (index < 20) {
    //         user.role = "CUSTOMER"
    //     } else {
    //         user.role = "ADMIN"
    //     }
    // }
    
    // );

    
//     console.log('Users with IDs:', users[15]);
//   // Convert the list to JSON format
// const jsonData = JSON.stringify(users, null, 2);

// // Create a Blob object from the JSON data
// const blob = new Blob([jsonData], { type: 'application/json' });

// // Create a download link
// const url = URL.createObjectURL(blob);
// const a = document.createElement('a');
// a.href = url;
// a.download = 'users.json';
// a.textContent = 'Download users.json';
// document.body.appendChild(a);


    const form = document.getElementById('login-form');
    form.addEventListener('submit', (event) => {
        // window.location.href = '../seller/seller-dashboard.html';

        event.preventDefault(); // Prevent default form submission
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let user = users.find((user) => user.email === email && user.password === password);
        if (user != null) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = '../seller/seller-dashboard.html';
        } else {
            alert('Invalid email or password');
        }
    });








});