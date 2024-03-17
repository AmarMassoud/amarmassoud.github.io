document.addEventListener("DOMContentLoaded", async() => {



const addImageBtn =document.getElementById('add-image');
addImageBtn.addEventListener('click', async(event)=>{
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

uploadImage(file)

})
      const  uploadImage= (file)=> {
        

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

        return fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const imageUrl = data.secure_url;
            // Use imageUrl to display or store the image URL
            console.log("Image uploaded. URL:", imageUrl);
            return imageUrl;
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            return null;
          });
      }
    




});