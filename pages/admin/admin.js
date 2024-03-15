document.addEventListener("DOMContentLoaded", async () => {
    let users = [];
    const getUsers = async () => {
        const usersData = localStorage.getItem('user');
        if (!usersData) {
            const response = await fetch('../../data/users.json');
            if (response.ok) {
                const responseData = await response.json();
                if (Array.isArray(responseData)) {
                    localStorage.setItem('user', JSON.stringify(responseData));
                    users = responseData;
                    console.log('Users data:', users);
                } else {
                    console.error('Invalid users data format:', responseData);
                }
            } else {
                console.error('Failed to fetch users data');
            }
        } else {
            users = JSON.parse(usersData);
            console.log('Users data:', users);
        }
    };
    await getUsers(); //
    
    let products = [];
    const getProducts = async () => {
        const productsData = localStorage.getItem('products');
        if (!productsData) {
            const response = await fetch('../../data/products.json');

            if (response.ok) {
                const responseData = await response.json();
                if (Array.isArray(responseData)) {
                    localStorage.setItem('products', JSON.stringify(responseData));
                    products = responseData;
                    console.log('products data:', users);
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
    };
    await getProducts(); //
    
    
//   // Convert the list to JSON format
// const jsonData = JSON.stringify(products, null, 2);

// // Create a Blob object from the JSON data
// const blob = new Blob([jsonData], { type: 'application/json' });

// // Create a download link
// const url = URL.createObjectURL(blob);
// const a = document.createElement('a');
// a.href = url;
// a.download = 'products.json';
// a.textContent = 'Download products.json';
// document.body.appendChild(a);





// // Filter users with the role SELLER
// const sellers = users.filter(user => user.role === "SELLER");

// // Assign a random seller to each product
// console.log(products)
// products.forEach(product => {
//     const randomIndex = Math.floor(Math.random() * sellers.length);
//     product.seller = sellers[randomIndex];
// });
//   // Convert the list to JSON format
// const jsonData = JSON.stringify(products, null, 2);

// // Create a Blob object from the JSON data
// const blob = new Blob([jsonData], { type: 'application/json' });

// // Create a download link
// const url = URL.createObjectURL(blob);
// const a = document.createElement('a');
// a.href = url;
// a.download = 'products.json';
// a.textContent = 'Download products.json';
// document.body.appendChild(a);



});