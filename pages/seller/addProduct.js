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





function previewImages() {
    const maxImagesToShow = 2;

    // Clear the existing preview
    preview.innerHTML = '';
    preview.appendChild(addImageBtn);
    let imagesToShow = images.slice(0, maxImagesToShow);
    let remainingImagesCount = Math.max(images.length - maxImagesToShow, 0);
  
    imagesToShow.forEach((file, index) => {
        let count=0;
        count+=1
        console.log(count);
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const imgSrc = e.target.result;
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
      };
  
      reader.readAsDataURL(file);
    });
  }
  
const deleteImage= (index) => {

images.splice(index, 1);
previewImages()

}


function addImage(file) {
  const preview = document.getElementById('preview');

  if (!images.some(image => image.name === file.name)) {

  // Add the new file to the images array
  images.push(file);

  // Create a FileReader to read the image file
  const reader = new FileReader();

  // Set up the FileReader onload event handler
  reader.onload = function(e) {
    // Re-render the preview
    ;}
    reader.readAsDataURL(file);
  };

  // Read the image file as a data URL
  
}

document.getElementById('file').addEventListener('change', function(e) {
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
const imagesUrl=await saveImages();

const user= JSON.parse(localStorage.getItem('currentUser'));
const currentProduct= JSON.parse(localStorage.getItem('currentProduct'));
const allProducts= JSON.parse(localStorage.getItem('products'));
console.log(currentProduct);
if (!currentProduct){
const product={

id: allProducts.length + 1,
title: productName,
description: productDescription,
price: price,
stock: stock,
category: category,
discountPercentage: discountPercentage,
images: imagesUrl,
seller: user,
};

allProducts.push(product)
      localStorage.setItem('products', JSON.stringify(allProducts));
}
if (categoryRequest!==''){
    const categoryRequests= JSON.parse(localStorage.getItem('categoryRequests'));
    categoryRequests.push(categoryRequest);
    localStorage.setItem('categoryRequest', JSON.stringify(categoryRequests));
}
}

async function saveImages() {
    return new Promise((resolve, reject) => {
        const files = [];
        const urls = [];

        let imagesProcessed = 0;

        for (let i = 0; i < images.length; i++) {
            const file = images[i];
            const reader = new FileReader();

            reader.onload = function (e) {
                urls.push(e.target.result);
                imagesProcessed++;

                if (imagesProcessed === images.length) {
                    resolve(urls);
                }
            };

            reader.readAsDataURL(file);
        }
    });
}

    
const submitBtn= document.querySelector("#submit-btn");
submitBtn.addEventListener('click', function(){
    onSave()
});
previewImages();
// saveImages();






});