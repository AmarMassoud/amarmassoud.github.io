document.addEventListener("DOMContentLoaded", async() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(currentUser.id === -1) window.location.href = "/";

    if(currentUser.role === "CUSTOMER") {
        document.querySelector("#nav").innerHTML = "<buyer-nav name=\"Wardan\" id=\"nav\"> </buyer-nav>"
        document.querySelector("#history").href = "../buyer/purchase-history/purchase-history.html"
    } else if(currentUser.role === "SELLER") {
        document.querySelector("#nav").innerHTML = "<seller-nav name=\"Wardan\" id=\"nav\"> </seller-nav>"
        document.querySelector("#history").href = "../seller/seller-history.html"
    }else if(currentUser.role === "ADMIN") {
        document.querySelector("#nav").innerHTML = "<admin-nav name=\"Wardan\" id=\"nav\"> </admin-nav>"
    }


    
    document.getElementById("name").textContent = currentUser.firstName.charAt(0);
    document.getElementById("name2").textContent = currentUser.firstName.charAt(0);
    document.getElementById("first-name").textContent = currentUser.firstName;
    document.getElementById("last-name").textContent = currentUser.lastName;
    document.getElementById("email").textContent = currentUser.email;



});

function switchEdit() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("user")); // Retrieve users from local storage
    if (this.textContent === "Edit") {
        console.log("edit")
        var element = this.parentNode;
        var h2 = this.previousElementSibling;
        var textField = document.createElement("input");
        textField.setAttribute("type", "text");
        textField.className = "mr-3.5 input input-bordered w-full focus:outline-none text-center";
        textField.setAttribute("id", "textField");
        textField.setAttribute("value", h2.textContent);
        element.replaceChild(textField, h2);
        

        this.textContent = "Save";
    } else if (this.textContent === "Save") {
        console.log("save")

        var element = this.parentNode;
        var textField = this.previousElementSibling;
        var enteredText = textField.value.split(" ")[0];

        var newElement = document.createElement("h3");
        newElement.setAttribute("class", "text-lg");
        newElement.textContent = enteredText;

        element.replaceChild(newElement, textField);

        if (this.parentNode.id === "fname") {
            users.find((user) => user.id == currentUser.id).firstName = enteredText;
        } else if (this.parentNode.id === "lname") {
            users.find((user) => user.id == currentUser.id).lastName = enteredText;
        } else if (this.parentNode.id === "emails") {
            users.find((user) => user.id == currentUser.id).email = enteredText;
        }
        const newCurrentUser = users.find((user) => user.id == currentUser.id); 
        console.log(currentUser);
        localStorage.setItem("currentUser", JSON.stringify(newCurrentUser));
         currentUser = JSON.parse(localStorage.getItem("currentUser"));
         window.location.reload();

        // Save the updated users array back to local storage
        localStorage.setItem('user', JSON.stringify(users));

        console.log(users);
        this.textContent = "Edit";
    }
}
