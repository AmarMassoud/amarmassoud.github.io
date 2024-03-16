document.addEventListener("DOMContentLoaded", async() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));


    document.getElementById("nav").setAttribute("name", currentUser.firstName.charAt(0));
    document.getElementById("name2").textContent = currentUser.firstName.charAt(0);  



});

