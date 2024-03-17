document.addEventListener('DOMContentLoaded', async() => {
    const preview = document.getElementById('preview');

    const addImageBtn =document.getElementById('add-file');

let images=[]


let categories=[]
const getCategories= async()=>{
const products= JSON.parse(localStorage.getItem('products'));
 categories= [...new Set(products.map(product=>product.category))];

}


const renderCategories= ()=>{

const dropDown=document.querySelector('#category')
dropDown.replaceChildren();
const disabledCategory = document.createElement('option');
disabledCategory.textContent='Select Category';
disabledCategory.disabled=true;
disabledCategory.selected=true;
dropDown.appendChild(disabledCategory);


getCategories()
console.log(categories);
categories.forEach(category=>{
    const option= document.createElement('option');
dropDown.appendChild(option);
option.textContent= category;

})
const option= document.createElement('option');
dropDown.appendChild(option);
option.textContent= 'Other';

}

renderCategories()


const selectedProduct= JSON.parse(localStorage.getItem('currentProduct'));
const productId= selectedProduct? selectedProduct.id : null;

const onEdit=(product) =>{
    document.querySelector('#product-name').value=product.title;
    document.querySelector('#product-description').value=product.description;
    document.querySelector("#base-price").value=product.price;
    document.querySelector("#stock").value=product.stock;
    document.querySelector("#category").value=product.category;
    document.querySelector("#discount-percentage").value=product.discountPercentage;
    images=product.images;
    
    // onDelete(product);
    previewImages();
    }
if (productId){
    onEdit(selectedProduct)
}



    
// function previewImages() {
//     const maxImagesToShow = 2;

//     // Clear the existing preview
//     preview.innerHTML = '';
//     preview.appendChild(addImageBtn);
//     let imagesToShow = images.slice(0, maxImagesToShow);
//     let remainingImagesCount = Math.max(images.length - maxImagesToShow, 0);
  
//     imagesToShow.forEach((file, index) => {
//         let count=0;
//         count+=1
//         console.log(count);
//       const reader = new FileReader();
  
//       reader.onload = function(e) {
//         const imgSrc = e.target.result;
//         const img = document.createElement('img');
//         img.src = imgSrc;
//         img.style.width = '150px';
//         img.style.marginRight = '10px';
//         img.addEventListener('click', function(){
//             deleteImage(index)
//         });
//         preview.appendChild(img);
        
//         if (index === imagesToShow.length - 1 && remainingImagesCount > 0) {
//           const remainingImagesDiv = document.createElement('div');
//           remainingImagesDiv.className = 'bg-gray-500 shadow-md w-40 h-40 grid grid-cols place-items-center rounded-xl';
//           const remainingImagesNo = document.createElement('p');
//           remainingImagesNo.className = 'font-bold text-lg ';
//           remainingImagesNo.textContent = `+${remainingImagesCount} `;
//             remainingImagesDiv.appendChild(remainingImagesNo);
//           preview.appendChild(remainingImagesDiv);
//         }
//       };
  
//       reader.readAsDataURL(file);
//     });
//   }
  




function previewImages() {
    const maxImagesToShow = 2;

    // Clear the existing preview
    preview.innerHTML = '';
    preview.appendChild(addImageBtn);
    let imagesToShow = images.slice(0, maxImagesToShow);
    let remainingImagesCount = Math.max(images.length - maxImagesToShow, 0);
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
        img.addEventListener('click', function(){
            deleteImage(index)
        });
        preview.appendChild(img);
        
        if (index === imagesToShow.length - 1 && remainingImagesCount > 0) {
          const remainingImagesDiv = document.createElement('div');
          remainingImagesDiv.className = 'bg-gray-500 shadow-md w-40 h-40 grid grid-cols place-items-center rounded-xl';
          const remainingImagesNo = document.createElement('p');
          remainingImagesNo.className = 'font-bold text-lg ';
          remainingImagesNo.textContent = `+${remainingImagesCount} `;
            remainingImagesDiv.appendChild(remainingImagesNo);
          preview.appendChild(remainingImagesDiv);
        }
      ;
  
    //   reader.readAsDataURL(file);
    });
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


const onDelete=(productId) => {
const storedProducts= JSON.parse(localStorage.getItem('products'));
const updatedProducts= storedProducts.filter(p=> p.id !== productId);
localStorage.setItem('products',JSON.stringify(updatedProducts));
}

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

const user= JSON.parse(localStorage.getItem('currentUser'));
const currentProduct= JSON.parse(localStorage.getItem('currentProduct'));
const allProducts= JSON.parse(localStorage.getItem('products'));
console.log(currentProduct);
if (imagesUrl){
const product={

id: currentProduct ? productId :allProducts.length + 1,
title: productName,
description: productDescription,
price: price,
stock: stock,
category: category,
discountPercentage: discountPercentage,
images: imagesUrl,
seller: user,
thumbnail: currentProduct? currentProduct.thumbnail : imagesUrl[0],
rating: currentProduct? currentProduct.rating: rating,
};

if(productId){
    allProducts.splice (allProducts.findIndex((product)=> product.id===productId),1);
}
allProducts.push(product)
// onDelete(productId);

      localStorage.setItem('products', JSON.stringify(allProducts));
}
if (categoryRequest!==''){
    const categoryRequests= JSON.parse(localStorage.getItem('categoryRequests'));
    categoryRequests.push(categoryRequest);
    localStorage.setItem('categoryRequest', JSON.stringify(categoryRequests));
}

localStorage.removeItem('currentProduct');

}

    
const submitBtn= document.querySelector("#submit-btn");
submitBtn.addEventListener('click', function(){
    const form= document.querySelector('#add-product');
    if (form.checkValidity()) {
    onSave()
    window.location.href = './sellerProducts.html';
}
    // window.location.href = '../seller/seller-dashboard.html';
    

});
previewImages();
// saveImages();







});