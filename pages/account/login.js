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

    const productsData = localStorage.getItem('products');
        if (!productsData) {
            const response = await fetch('../../data/products.json');
  
            if (response.ok) {
                const responseData = await response.json();
                if (Array.isArray(responseData)) {
                    localStorage.setItem('products', JSON.stringify(responseData));
                    products = responseData;
                    // console.log('products data:', users);
                } else {
                    console.error('Invalid products data format:', responseData);
                }
            } else {
                console.error('Failed to fetch products data');
            }
        } else {
            products = JSON.parse(productsData);
            console.log('products data:', products);
        }
        const commentsData = localStorage.getItem('comments');
        if (!commentsData) {
            const response = await fetch('/data/comments.json');
  
            if (response.ok) {
                const responseData = await response.json();
                responseData.forEach((comment) => {
                    if(comment.rating===undefined){
                        comment.rating=Math.floor(Math.random() * 5) + 1;
                    }
                });
                if (Array.isArray(responseData)) {

                    localStorage.setItem('comments', JSON.stringify(responseData));
                    // console.log('comments data:', comments);
                } else {
                    console.error('Invalid products data format:', responseData);
                }
            } else {
                console.error('Failed to fetch products data');
            }
        } else {
            // console.log('comments data:', comments);
        }
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
            console.log('User:', user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (user.role === 'CUSTOMER') {
                window.location.href = '/pages/buyer/landingPage/landingPage.html';
            } else if (user.role === 'SELLER') {
                window.location.href = '/pages/seller/seller-dashboard.html';
            }  if(user.role === 'ADMIN') {
                window.location.href = '/pages/admin/admin.html';
            }
            // window.location.href = '../../pages/seller/seller-dashboard.html';
        } else {
            alert('Invalid email or password');
        }
    });








});