document.addEventListener("DOMContentLoaded", async() => {

  comments = [];
  const getComments = async () => {
      const commentsData = localStorage.getItem('comments');
      if (!commentsData) {
          const response = await fetch('../../data/comments.json');

          if (response.ok) {
              const responseData = await response.json();
              if (Array.isArray(responseData)) {
                  localStorage.setItem('comments', JSON.stringify(responseData));
                  comments = responseData;
                  console.log('comments data:', comments);
              } else {
                  console.error('Invalid products data format:', responseData);
              }
          } else {
              console.error('Failed to fetch products data');
          }
      } else {
        comments = JSON.parse(commentsData);
          console.log('comments data:', comments);
      }
  };
  await getComments(); //


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
  };
  await getProducts(); //
  
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


    comments.forEach(comment=>{comment.rating=Math.floor(Math.random() * 5) + 1;});
    // localStorage.setItem('comments', JSON.stringify(comments));
// // Loop through comments list
// comments.forEach(comment => {
//   // Filter users with the role BUYER
//   const buyers = users.filter(user => user.role === "BUYER");
  
//   // Get a random index for the buyers list
//   const randomIndex = Math.floor(Math.random() * buyers.length);
  
//   // Assign a random buyer to the comment
//   comment.user = buyers[randomIndex];
  
//   // Add a random product id from 0 to 29
//   comment.productId = Math.floor(Math.random() * 30);
  
//   // Generate a random timestamp for yesterday
//   const randomOffsetSeconds = Math.floor(Math.random() * 86400); // Random number of seconds between 0 and 86400 (24 hours)
//   const yesterday = new Date(Date.now() - 86400 * 1000); // Yesterday's date
//   const randomTimestamp = new Date(yesterday.getTime() + randomOffsetSeconds * 1000); // Random timestamp between yesterday and now
//   comment.timestamp = randomTimestamp.toISOString(); // Convert timestamp to string
// });

// Sort comments by timestamp in descending order (newest first)
comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

// //     console.log('Users with IDs:', users[15]);
//   // Convert the list to JSON format
// const jsonData = JSON.stringify(comments, null, 2);

// // Create a Blob object from the JSON data
// const blob = new Blob([jsonData], { type: 'application/json' });

// // Create a download link
// const url = URL.createObjectURL(blob);
// const a = document.createElement('a');
// a.href = url;
// a.download = 'users.json';
// a.textContent = 'Download users.json';
// document.body.appendChild(a);








const currentUser=JSON.parse(localStorage.getItem("currentUser"));
  const select = document.getElementById("sellerNav");
  console.log(currentUser.firstName)
    select.setAttribute("name",currentUser.firstName)

  const renderComment = (comment) => {

    const commentDiv = document.createElement("div");
    commentDiv.classList.add(
      "flex",
      "pb-8",
      "border-b-2",
      "border-gray-300",
      "mt-4"
    );

    const imgDiv = document.createElement("div");
    const commentImg = document.createElement("img");
    commentImg.src = "../../media/grey-cart.svg";

    imgDiv.appendChild(commentImg);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("mt-4", "ms-3");

    const name = document.createElement("h3");
    name.classList.add("text-xl", "font-bold");
    name.textContent = comment.user.firstName + " " + comment.user.lastName;

    const product = document.createElement("p");
    product.classList.add("text-sm");
    product.textContent = products.find((product) => product.id===comment.productId).title;

    const commentP = document.createElement("p");
    commentP.classList.add("mt-3");
    commentP.textContent = comment.body;

    infoDiv.appendChild(name);
    infoDiv.appendChild(product);
    infoDiv.appendChild(commentP);
    
    commentDiv.appendChild(imgDiv);
    commentDiv.appendChild(infoDiv);

    return commentDiv;
  };

  const renderComments = () => {

    const commentsDiv = document.querySelector("#latest-comments");
    commentsDiv.replaceChildren();

    let displayComments=[]
    for (let i = 0; i < 3; i++) {
      displayComments.push(comments[i]);
    }

    displayComments.forEach((comment) =>
      commentsDiv.appendChild(renderComment(comment))
    );
  };

  const rednderTotalSales = () => {
    const totalSalesDiv = document.querySelector("#total-sales-div");

    const totalSales = document.createElement("h3");
    totalSales.classList.add("text-5xl", "font-bold", "ms-3");
    totalSales.textContent = 1000;

    totalSalesDiv.appendChild(totalSales);
    
  };

  const totalCustomers=() =>{

    const totalCustomersDiv = document.querySelector("#total-customers-div");

    const totalCustomers=document.createElement("h3");
    totalCustomers.classList.add("text-5xl", "font-bold", "ms-3");
    totalCustomers.textContent=105;

    totalCustomersDiv.appendChild(totalCustomers);

  }
  
  const renderRequest = (comment) => {

    const requestDiv = document.createElement("div");
    requestDiv.classList.add(
      "grid",
      "grid-cols-4",
      "gap-2",
      "pb-4",
      "border-b-2",
      "border-gray-300",
      "mt-4"
    );

    const imgDiv = document.createElement("div");
    imgDiv.className='col-span-1'
    const commentImg = document.createElement("img");
    commentImg.src = "../../media/grey-cart.svg";
    // commentImg.className="w-96"
 

    imgDiv.appendChild(commentImg);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("mt-4", "ms-3");

    const name = document.createElement("h3");
    name.classList.add("text-xl", "font-semibold");
    name.textContent = comment.user.firstName + " " + comment.user.lastName;

    const product = document.createElement("p");
    product.classList.add("text-sm");
    product.textContent = products.find((product) => product.id===comment.productId).title;

    const commentP = document.createElement("p");
    commentP.classList.add("mt-3");
    commentP.textContent = comment.body;

    const moreDetails = document.createElement("button");
    moreDetails.classList.add("text-bs", "font-semibold", "text-black-500", "bg-white","py-2", "px-10","rounded-xl", "hover:text-red-700",   "mt-5", "text-nowrap");
    moreDetails.textContent = 'More Details';



    infoDiv.appendChild(name);
    infoDiv.appendChild(product);
    infoDiv.appendChild(commentP);
    infoDiv.appendChild(moreDetails);
    infoDiv.className='col-span-3'
    requestDiv.appendChild(imgDiv);
    requestDiv.appendChild(infoDiv);

    return requestDiv;
  };

  const renderRequests = () => {

    const commentsDiv = document.querySelector("#refund-requests");
    commentsDiv.replaceChildren();

    let displayRequests=[]
    for (let i = 0; i < 3; i++) {
      displayRequests.push(comments[i]);
    }

    displayRequests.forEach((comment) =>
      commentsDiv.appendChild(renderRequest(comment))
    );
  };




  const ctx = document.getElementById('barchart').getContext('2d');  
  const barchart= new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of sales',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      backgroundColor: '#F20E0F',
      borderRadius: 10
    },
    
  });



  




  renderComments();
  rednderTotalSales();
  renderRequests();
  totalCustomers();
});
