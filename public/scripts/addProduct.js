document.addEventListener('DOMContentLoaded', async() => {
    const preview = document.getElementById('preview');

    const addImageBtn =document.getElementById('add-file');

    const currentUserId=JSON.parse(localStorage.getItem('currentUser'))
    let currentUser= {};
    if (currentUserId !== "-1") {
        const responseUser = await fetch(`/api/user/${currentUserId}`, {
            method: "GET",
        })
        if (responseUser.ok) {
            currentUser = await responseUser.json();
        }
    }



    if(currentUser.role === "ADMIN") {
      document.querySelector("#nav").innerHTML = "<admin-nav name=\"Wardan\" id=\"nav\"> </admin-nav>"
      // document.querySelector("#history").href = "../buyer/purchase-history/purchase-history.html"
  } else if(currentUser.role === "SELLER") {
      document.querySelector("#nav").innerHTML = "<seller-nav name=\"Wardan\" id=\"nav\"> </seller-nav>"
      // document.querySelector("#history").href = "../seller/seller-history.html"
  }



let images=[]


let categories=[]
const getCategories= async()=>{
        let products=[]
    const response = await fetch(`/api/products`).then(res=>res.json()).then(data=>products=data);
        console.log(products);

 categories= [...new Set(products.map(product=>product.category))];

}


const renderCategories= async ()=>{

const dropDown=document.querySelector('#category')
dropDown.replaceChildren();
const disabledCategory = document.createElement('option');
disabledCategory.textContent='Select Category';
disabledCategory.disabled=true;
disabledCategory.selected=true;
dropDown.appendChild(disabledCategory);


await getCategories()
console.log(categories);
categories.forEach(category=>{
    const option= document.createElement('option');
dropDown.appendChild(option);
option.textContent= category;

})

if (!categories.find (category=> category==='Other')){

const option= document.createElement('option');
option.textContent= 'Other';
dropDown.appendChild(option);

}

}

renderCategories()

    const selectedProductId=JSON.parse(localStorage.getItem('currentProduct'));
    let selectedProduct= {};
    const responseProduct = await fetch(`/api/products/${selectedProductId}`).then(res=>res.json()).then(data=>selectedProduct=data);
const productId= selectedProduct? selectedProduct.id : null;

const onEdit=(product) =>{
    document.querySelector('#product-name').value=product.title;
    document.querySelector('#product-description').value=product.description;
    document.querySelector("#base-price").value=product.price;
    document.querySelector("#stock").value=product.stock;
    document.querySelector("#category").value=product.category;
    document.querySelector("#discount-percentage").value=product.discountPercentage;
    images=product.images.map(image=> {
        if (image.url){
        return image.url
        }
        else{
            return image
        }
    });
    document.querySelector("#submit-btn").value='Update Product';
    
    // onDelete(product);
    previewImages();
    }
if (productId){
    onEdit(selectedProduct)
}



function previewImages() {
    const maxImagesToShow = 3;

    // Clear the existing preview
    preview.innerHTML = '';
    let imagesToShow = images.slice(0, maxImagesToShow);
    let remainingImagesCount = Math.max(images.length - maxImagesToShow, 0) ;
    console.log(imagesToShow);
    imagesToShow.forEach((url, index) => {
        // let count=0;
        // count+=1
        // console.log(count);

        const imgSrc = url;
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.width = '150px';
        img.style.marginRight = '10px';
        img.classList.add('hover:scale-110', 'hover:cursor-pointer');

        img.addEventListener('click', function(){
            deleteImage(index)
        });
        preview.appendChild(img);
        
        if (index === imagesToShow.length - 1 && remainingImagesCount > 0) {
          preview.removeChild((preview.lastChild))
          const remainingImagesDiv = document.createElement('div');
          remainingImagesDiv.className = 'bg-gray-500 shadow-md w-40 h-40 grid grid-cols place-items-center rounded-xl';
          const remainingImagesNo = document.createElement('p');
          remainingImagesNo.className = 'font-bold text-lg ';
          remainingImagesNo.textContent = `+${remainingImagesCount +1}  `;
            remainingImagesDiv.appendChild(remainingImagesNo);
          preview.appendChild(remainingImagesDiv);
        }
      ;
  
    //   reader.readAsDataURL(file);
    })
    preview.appendChild(addImageBtn);

    ;
  }










const deleteImage= (index) => {

images.splice(index, 1);
previewImages()

}

const  addImage= async (file)=> {
        

    if (!file) {
      alert("Please select an image.");
      return;
    }

    const cloudName = "dib1xd9zh"; // Replace YOUR_CLOUD_NAME with your actual Cloudinary cloud name
    const apiKey = "899658446687419"; // Replace YOUR_API_KEY with your actual Cloudinary API key
    const apiSecret = "foW9SYkUoXemif9tLgEUruIukhQ"; // Replace YOUR_API_SECRET with your actual Cloudinary API secret

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mymjce3c"); // Replace YOUR_UPLOAD_PRESET with your actual Cloudinary upload preset

    try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        const imageUrl = data.secure_url;
        // Use imageUrl to display or store the image URL
        console.log("Image uploaded. URL:", imageUrl);
        images.push(imageUrl);
        previewImages()
        console.log(images);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };


// function addImage(file) {
//   const preview = document.getElementById('preview');

//   if (!images.some(image => image.name === file.name)) {

//   // Add the new file to the images array
//   images.push(file);

//   // Create a FileReader to read the image file
//   const reader = new FileReader();

//   // Set up the FileReader onload event handler
//   reader.onload = function(e) {
//     // Re-render the preview
//     ;}
//     reader.readAsDataURL(file);
//   };

//   // Read the image file as a data URL
  
// }

document.getElementById('file').addEventListener('change', function(e)  {
  const files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    addImage(files[i]);
  }
  previewImages()
});

const categoryElement=document.querySelector("#category");
const categoryRequestElement=document.querySelector("#request-category");
categoryRequestElement.disabled=true;
categoryElement.addEventListener("change", function() {
    const category = categoryElement.value.trim();
    console.log(category);
    category === 'Other' ? categoryRequestElement.disabled = false : categoryRequestElement.disabled = true;
});

const requestCategoryBtn=document.querySelector("#request-category-btn");
requestCategoryBtn.addEventListener("click", function() {
    categoryElement.value = 'Other';
    categoryRequestElement.disabled=false;
    categoryRequestElement.focus();
});


const onSave = async () => {

const productName=document.querySelector('#product-name').value.trim();
const productDescription=document.querySelector('#product-description').value.trim();
const price=document.querySelector("#base-price").value.trim();
const stock=document.querySelector("#stock").value.trim();
const category=document.querySelector("#category").value.trim();
const discountPercentage= document.querySelector("#discount-percentage").value.trim();
const categoryRequest=document.querySelector("#request-category").value.trim();
const rating=Math.floor(Math.random()*6)
const imagesUrl=images;

const userId=JSON.parse(localStorage.getItem('currentUser')||"-1")
    let user= {};
const responseUser = await fetch(`/api/user/${userId}`).then(res=>res.json()).then(data=>user=data);

const currentProductId=JSON.parse(localStorage.getItem('currentProduct')?? "-1")
let currentProduct= {};
const responseProduct = await fetch(`/api/products/${currentProductId}`).then(res=>res.json()).then(data=>currentProduct=data);
    let allProducts=[]
    const response = await fetch(`/api/products`).then(res=>res.json()).then(data=>allProducts=data);
console.log(currentProduct);
let categoryProduct=null
if (imagesUrl){
let product={

id: (currentProductId!=="-1")? currentProductId : undefined,
title: productName,
description: productDescription,
price: price,
stock: stock,
    brand:"market-hub",
category: category,
discountPercentage: discountPercentage,
seller: currentProduct? currentProduct.seller : user,
thumbnail: currentProduct? currentProduct.thumbnail : imagesUrl[0],
rating: currentProduct? currentProduct.rating: rating,
};

    categoryProduct=product;
    console.log(product);
    if(!product.id){
        product.id= allProducts.length+1;
        const response = await fetch(`/api/products`, {
            method: 'POST',
            body: JSON.stringify({...product}),
        });
        console.log('post');
    }
    else {
        const res= await fetch(`/api/products/${currentProductId}`, {
            method: 'PATCH',
            body: JSON.stringify({...product}),
        });
        console.log('patch');
    }
    // for (const imageUrl of imagesUrl) {
    //     const res=await fetch(`/api/images`, {
    //         method: 'POST',
    //         body: JSON.stringify({url: imageUrl, productId: product.id.toString()}),
    //     });
    // }
}

if (categoryRequest!==''){



    
    const categoryRequests= JSON.parse(localStorage.getItem('categoryRequests')) ||[];

    const request={
    name: categoryRequest,
    user: currentProduct? currentProduct.seller : user,
    product: categoryProduct,
    };
    
    categoryRequests.push(request);
    localStorage.setItem('categoryRequest', JSON.stringify(categoryRequests));
    
}

localStorage.setItem('currentProduct', JSON.stringify("-1"));
if(currentUser.role==='SELLER'){
// window.location.href = '../sellerProducts.html';
// }else{window.location.href = '../admin.html';
}


}
const handleSubmit = async (event) => {
  const form= document.querySelector('#add-product');
      event.preventDefault(); // Prevent default form submission

    if (form.checkValidity()) {
    await onSave()

}
}
    
const submitBtn= document.querySelector("#submit-btn");
submitBtn.addEventListener('click', handleSubmit);

previewImages();
// saveImages();







});