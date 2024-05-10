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
  
  comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  const currentUser=JSON.parse(localStorage.getItem("currentUser"));

  if(currentUser.role === "ADMIN") {
    document.querySelector("#nav").innerHTML = "<admin-nav name=\"Wardan\" id=\"nav\"> </admin-nav>"
    // document.querySelector("#history").href = "../buyer/purchase-history/purchase-history.html"
} else if(currentUser.role === "SELLER") {
    document.querySelector("#nav").innerHTML = "<seller-nav name=\"Wardan\" id=\"nav\"> </seller-nav>"
    document.querySelector("#history").href = "../seller-history.html"
}


const getTotalSales=()=>{
  const purchases=JSON.parse(localStorage.getItem('purchasedItems')) || [];
  const totalSales=purchases.reduce((acc,curr)=>acc+curr.totalPrice,0);
return totalSales;
}

  
    // const select = document.getElementById("sellerNav");
    // console.log(currentUser.firstName)
    //   select.setAttribute("name",currentUser.firstName)
    console.log(comments)

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
      console.log(products, 'products');
      console.log(comment);
      product.textContent =products.find((product) => product.id===comment.productId)? products.find((product) => product.id===comment.productId).title : null;
  
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
  if(comments.length>0){
      let displayComments=[]
      for (let i = 0; i < 3; i++) {
        displayComments.push(comments[i]); 
    }
      displayComments.forEach((comment) =>
        commentsDiv.appendChild(renderComment(comment))
      );}
    };
  
    const rednderTotalSales = () => {
      const totalSalesDiv = document.querySelector("#total-sales-div");
  
      const totalSales = document.createElement("h3");
      totalSales.replaceChildren();

      totalSales.classList.add("text-5xl", "font-bold", "ms-3");
      totalSales.textContent = '$' + getTotalSales();
  
      totalSalesDiv.appendChild(totalSales);
      
    };
  
    const totalCustomers=() =>{

        const noOfCustomers= users.filter(user => user.role === "CUSTOMER").length; 

  
      const totalCustomersDiv = document.querySelector("#total-customers-div");
  
      const totalCustomers=document.createElement("h3");
      totalCustomers.replaceChildren();
      totalCustomers.classList.add("text-5xl", "font-bold", "ms-3");
      totalCustomers.textContent=noOfCustomers;
  
      totalCustomersDiv.appendChild(totalCustomers);
  
    }
    const totalSellers=() =>{
        const noOfSellers= users.filter(user => user.role === "SELLER").length; 

    const totalSellersDiv = document.querySelector("#total-sellers-div");
    const totalSellers=document.createElement("h3");
    totalSellers.classList.add("text-5xl", "font-bold", "ms-3");
    totalSellers.textContent=noOfSellers;

    totalSellersDiv.appendChild(totalSellers);
    
      }
    const totalProducts=() =>{
        const noOfProducts= products.length; 
        const totalProductsDiv = document.querySelector("#total-products-div");

        const totalProducts=document.createElement("h3");
        // totalProducts.replaceChildren();
        totalProducts.classList.add("text-5xl", "font-bold", "ms-3");
        totalProducts.textContent=noOfProducts;

        totalProductsDiv.appendChild(totalProducts);

    }
    


 let categoryRequests= JSON.parse(localStorage.getItem('categoryRequest')) || [];


    const renderRequest = (category) => {
  
      const requestDiv = document.createElement("div");
      requestDiv.classList.add(
        "flex",
      );
  
      const imgDiv = document.createElement("div");
      const commentImg = document.createElement("img");
      commentImg.src = "../../media/grey-cart.svg";
  
      imgDiv.appendChild(commentImg);
  
      const infoDiv = document.createElement("div");
      infoDiv.classList.add("mt-4", "ms-3");
  
      const name = document.createElement("h3");
      name.classList.add("text-xl", "font-bold");
      name.textContent = category.user.firstName + " " + category.user.lastName;
  
      const product = document.createElement("p");
      product.classList.add("text-sm");
      product.textContent = category.product.title;
  
      const commentText = document.createElement("p");
      commentText.classList.add("mt-3");
      commentText.textContent = category.name;
  
    const decisionDiv= document.createElement("div");
    decisionDiv.className="flex flex-row gap-4 pe-2 justify-center";

      const rejectBtn = document.createElement("button");
      rejectBtn.classList.add("text-bs", "font-bold", "text-white", "bg-custom-red","py-2", "px-8","rounded-xl", "hover:py-3",   "mt-5", "text-nowrap");
      rejectBtn.textContent = 'Reject';

      const acceptBtn = document.createElement("button");
      acceptBtn.classList.add("text-bs", "font-bold", "text-white", "bg-green-800","py-2", "px-8","rounded-xl", "hover:py-3",   "mt-5", "text-nowrap");
      acceptBtn.textContent = 'Accept';
  
     const requestDetailsDiv= document.createElement("div");
     requestDetailsDiv.className="flex flex-col gap-4 px-2 pb-4 border-b-2 border-gray-300 mt-4 ";



        decisionDiv.appendChild(rejectBtn);
        decisionDiv.appendChild(acceptBtn);
  
  
      infoDiv.appendChild(name);
      infoDiv.appendChild(product);
      infoDiv.appendChild(commentText);
      
      requestDiv.appendChild(imgDiv);
      requestDiv.appendChild(infoDiv);
requestDetailsDiv.appendChild(requestDiv)

requestDetailsDiv.appendChild(decisionDiv);


        acceptBtn.addEventListener('click',()=>{
            products.find(product=>product.id===category.product.id).category=category.name;
            categoryRequests=categoryRequests.filter(request=>request!==category);
            localStorage.setItem('categoryRequest',JSON.stringify(categoryRequests));
            localStorage.setItem('products',JSON.stringify(products));

            renderRequests();
            renderProducts();
            renderCategories();


        })

  
      return requestDetailsDiv;
    };
  
    const renderRequests = () => {
        if (categoryRequests.length>0){

      const requestDiv = document.querySelector("#refund-requests");
      requestDiv.replaceChildren();
  
      let displayRequests=[]
      for (let i = 0; i < 3; i++) {
        displayRequests.push(categoryRequests[i]);
      }
  
      displayRequests.forEach((request) =>
      requestDiv.appendChild(renderRequest(request))
      );}
      
      else {

        const commentsDiv = document.querySelector("#refund-requests");
        commentsDiv.replaceChildren();
        commentsDiv.className='h-[46.375rem]  flex flex-col justify-center items-center'
        const noRequests= document.createElement("p");
        noRequests.className="text-2xl font-bold text-center  text-gray-500  ";
        noRequests.innerHTML="No requests at the Moment"

        const noRequestsIcon= document.createElement("i");
        noRequestsIcon.className="fa-solid fa-check text-5xl text-gray-500"
       
        commentsDiv.appendChild(noRequests);
        commentsDiv.appendChild(noRequestsIcon);
      }



    };
  




  const renderCategories =()=>{
const categoriesDiv=document.querySelector("#categories");

const products= JSON.parse(localStorage.getItem('products'));
let  categories= [...new Set(products.map(product=>product.category))];

categories.forEach(category => {
    const categoryLabel = document.createElement('p')
    categoryLabel.textContent=category;
    categoryLabel.className='text-xl font-bold bg-white px-6 py-2 rounded-xl shadow-md mg-auto';
    categoriesDiv.appendChild(categoryLabel);
})


  }
  
  
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
  
  
  
    
  
const renderProduct= (product) =>{
    const productDiv =document.createElement('div');
    productDiv.className = 'grid grid-cols-10 border-b-2 border-custom-gray-500 pb-2 pt-2 gap-8 text-slate-600 -sm:grid-cols-8 -sm:me-1  ';

    const productImg=document.createElement('img');
    productImg.src=product.thumbnail  || product.images[0];
    productImg.className='max-h-16 max-w-20';
    const productName=document.createElement('p');
    productName.textContent=product.title;
    const productInfo=document.createElement('div');
    productInfo.className='col-span-2 grid grid-cols-2 gap-4  -md:flex -md:flex-col -sm:col-span-1 ';
    const productPrice=document.createElement('p');
    productPrice.textContent=product.price + '$';
    productPrice.className='text-center';


    const productStock=document.createElement('p');
    productStock.textContent=product.stock ;
    productStock.className='text-center';

    
    const productEarnings=document.createElement('p');
    productEarnings.textContent= product.price*product.stock + '$' ;
    productEarnings.className='text-center';

    // needs update
    const productSales=document.createElement('p');
    productSales.textContent=product.stock + '$' ;
    productSales.className='text-center';

    // needs update

    const productCategory=document.createElement('p');
    productCategory.textContent=product.category ;
    productCategory.className='text-center';



    const productRating=document.createElement('p');
    productRating.textContent=product.rating ;
    productRating.className='text-center';


    const productActions=document.createElement('div');
    productActions.className='col-span-2 flex justify-center items-center -sm:col-span-1 -sm:flex-col -sm:gap-2 -sm:justify-start';
    

    const editButton=document.createElement('button');
    const deleteButton=document.createElement('button');
    const editIcon=document.createElement('i');
    editButton.className='mx-3';
    const deleteIcon=document.createElement('i');
    editIcon.className='fa-solid fa-pen'
    deleteIcon.className='fa-solid fa-trash  text-red-500';
    editButton.appendChild(editIcon);
    deleteButton.appendChild(deleteIcon);
    productActions.appendChild(editButton);
    productActions.appendChild(deleteButton)
    

    productInfo.appendChild(productImg);
    productInfo.appendChild(productName);
    productDiv.appendChild(productInfo);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productStock);
    productDiv.appendChild(productEarnings);
    productDiv.appendChild(productSales);
    productDiv.appendChild(productCategory);
    productDiv.appendChild(productRating);
    productDiv.appendChild(productActions);

    deleteButton.addEventListener('click',()=>{
        deleteProduct(product.id);
        totalProducts()
        renderProducts()
    })
    editButton.addEventListener('click',()=>{
           localStorage.setItem('currentProduct',JSON.stringify(product)); 
           window.location.href = '../seller/addProduct.html';

    })
    
return productDiv;
}

const deleteProduct=(id)=>{
    let allProducts = JSON.parse(localStorage.getItem('products'));
    allProducts=allProducts.filter(product=>product.id!==id);
    localStorage.setItem('products',JSON.stringify(allProducts));
    products = allProducts
    console.log(id);

    comments=comments.filter(comment=>comment.productId!==id);
    localStorage.setItem('comments',JSON.stringify(comments));


    
    renderProducts();
}

const renderProducts=()=>{
    
    const productsDiv=document.querySelector('#products-table');
    productsDiv.replaceChildren();
    products.forEach((product)=>
    productsDiv.appendChild(renderProduct(product))
    )
}
const originalProducts = products.slice();

const  handleSearch= (event)=> {
  const inputValue = event.target.value.toLowerCase();
  if (inputValue === '') {
    products = originalProducts.slice();
  } else {
    products = originalProducts.filter((product) => product.title.toLowerCase().includes(inputValue));
  }
  renderProducts();
}

const searchField = document.getElementById('search');
searchField.addEventListener('input', handleSearch);
searchField.addEventListener('change', handleSearch);




let sortDirection = {};

const parentElement = document.getElementById('products-header');

  parentElement.addEventListener('click', function(event) {
    console.log('Paragraph clicked:', event.target.textContent);
    const headerText = event.target.textContent.trim().toLowerCase();
        let direction = 1;

        if (sortDirection[headerText] === 1) {
            direction = -1;
        }

        sortDirection[headerText] = direction;

        if (headerText === 'price') {
            products.sort((a, b) => direction * (a.price - b.price));
        } else if (headerText === 'stock') {
            products.sort((a, b) => direction * (a.stock - b.stock));
        } else if (headerText === 'earnings') {
            products.sort((a, b) => direction * (a.price * a.stock - b.price * b.stock));
        } else if (headerText === 'sales') {
            products.sort((a, b) => direction * (a.stock - b.stock));
        } else if (headerText === 'category') {
            products.sort((a, b) => direction * a.category.localeCompare(b.category));
        } else if (headerText === 'rating') {
            products.sort((a, b) => direction * (a.rating - b.rating));
        } else if (headerText === 'product') {
            products.sort((a, b) => direction * a.title.localeCompare(b.title));
        }

        renderProducts();
  
});

renderProducts()
  
  
  
    renderComments();
    rednderTotalSales();
    renderRequests();
    totalCustomers();
    totalSellers();
    totalProducts();
    renderCategories();
  });
  