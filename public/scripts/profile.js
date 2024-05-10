document.addEventListener("DOMContentLoaded", async() => {
    const currentUserId = JSON.parse(localStorage.getItem("currentUser"));

    const getUser = await fetch(`/api/user/${currentUserId}`, {
        method: "GET",
        mode: 'no-cors',
    });

    const currentUser = await getUser.json();

    if(currentUser.role === "CUSTOMER") {
        document.querySelector("#nav").innerHTML = "<buyer-nav name=\"Wardan\" id=\"nav\"> </buyer-nav>"
        document.querySelector("#history").href = "../buyer/purchase-history/purchase-history.html"
    } else if(currentUser.role === "SELLER") {
        document.querySelector("#nav").innerHTML = "<seller-nav name=\"Wardan\" id=\"nav\"> </seller-nav>"
        document.querySelector("#history").href = "../seller-history.html"
    }else if(currentUser.role === "ADMIN") {
        document.querySelector("#nav").innerHTML = "<admin-nav name=\"Wardan\" id=\"nav\"> </admin-nav>"
        document.querySelector("#history-icon").className = "hidden"

    }

    
    document.getElementById("name").textContent = currentUser.firstName.charAt(0);
    document.getElementById("name2").textContent = currentUser.firstName.charAt(0);
    document.getElementById("first-name").textContent = currentUser.firstName;
    document.getElementById("last-name").textContent = currentUser.lastName;
    document.getElementById("email").textContent = currentUser.email;



});

async function switchEdit() {
    let currentUserId = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUserId)
    if (this.textContent.replace(/\s/g, '') === "Edit") {
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

        var element = this.parentNode;
        var textField = this.previousElementSibling;
        var enteredText = textField.value.split(" ")[0];

        var newElement = document.createElement("h3");
        newElement.setAttribute("class", "text-lg");
        newElement.textContent = enteredText;

        element.replaceChild(newElement, textField);

        if (this.parentNode.id === "fname") {

            await fetch(`/api/user/${currentUserId}`, {
                method: "PATCH",
                body: JSON.stringify(
                    {
                        firstName: enteredText,
                    }),
            });
        } else if (this.parentNode.id === "lname") {
            await fetch(`/api/user/${currentUserId}`, {
                method: "PATCH",
                body: JSON.stringify(
                    {
                        lastName: enteredText
                    }),
            });
        } else if (this.parentNode.id === "emails") {
            await fetch(`/api/user/${currentUserId}`, {
                method: "PATCH",
                body: JSON.stringify(
                    {
                        email: enteredText
                    }),
            });
        }
        console.log(currentUserId);




        this.textContent = "Edit";
    }
}
