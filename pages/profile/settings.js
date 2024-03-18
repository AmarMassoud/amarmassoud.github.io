document.addEventListener("DOMContentLoaded", async() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));


    document.getElementById("nav").setAttribute("name", currentUser.firstName.charAt(0));
    document.getElementById("name2").textContent = currentUser.firstName.charAt(0);  




/*
// editButton = document.querySelector("#edit-phone");
        editButton.addEventListener("click", () => {
                if(editButton.textContent === "Edit") {
                    var element = editButton.parentNode;
                    var h2 = editButton.previousElementSibling;
                    var textField = document.createElement("input");
                    textField.setAttribute("type", "phone");
                    textField.className = "mr-3.5";
                    textField.setAttribute("id", "textField");
                    element.replaceChild(textField, h2);
                    editButton.textContent = "Save";
                } else if (editButton.textContent === "Save") {
                    var element = editButton.parentNode;
                    var textField = editButton.previousElementSibling;
                    var enteredText = textField.value;
            
                    var newElement = document.createElement("h3");
                    newElement.setAttribute("class", "text-lg");
                    newElement.textContent = enteredText;
            
                    if(enteredText.length)



                    element.replaceChild(newElement, textField);


                    






                    editButton.textContent = "Edit";

                }





        })
*/



    const securityPasswordSection = () => {
        const passwordField = document.querySelector("#security-password-field")
        const phoneField = document.querySelector("#phone-password")
        const editButton = document.querySelector("#edit-password");
        editButton.addEventListener("click", () => {
                if (editButton.textContent === "Edit") {
                    
                        var element = editButton.parentNode;
                        var h2 = editButton.previousElementSibling;
                        var textField = document.createElement("input");
                        textField.setAttribute("type", "password");
                        textField.className = "mb-16 mx-8 input input-bordered";
                        textField.setAttribute("id", "password-textfield");
                        var newPasswordLabel = document.createElement("h3");
                        newPasswordLabel.setAttribute("class", "font-semibold text-2xl");
                        newPasswordLabel.textContent = "New Password";
                        newPasswordLabel.setAttribute("id", "new-password-label")
                        document.querySelector("#passwordDiv").appendChild(newPasswordLabel)

                        var newPassword = document.createElement("input");
                        newPassword.setAttribute("type", "password");
                        newPassword.className = "mb-16 mx-8 input input-bordered col-start-2";
                        newPassword.setAttribute("id", "new-password-textfield");
                        document.querySelector("#passwordDiv").appendChild(newPassword)
                        element.replaceChild(textField, h2);










                        editButton.textContent = "Save";

                } else if (editButton.textContent === "Save") {
                        
                    
                        var element = editButton.parentNode;
                        var textField = editButton.previousElementSibling;


                        var newElement = document.createElement("h3");
                        newElement.setAttribute("class", "text-lg");
                        newElement.textContent = "*".repeat(currentUser.password.length);

                        
                        console.log(currentUser.password);
                        if(currentUser.password === document.querySelector("#password-textfield").value) {
                            currentUser.password = document.querySelector("#password-textfield").value
                            console.log("TES T " + document.querySelector("#password-textfield"))
                            console.log(currentUser);
                            localStorage.setItem("currentUser", JSON.stringify(currentUser));
                            console.log("password changed");

                        } else {
                            console.log("wrong password nerd");
                        }


                        editButton.textContent = "Edit";
                        document.querySelector("#passwordDiv").removeChild(document.querySelector("#new-password-textfield"))
                        document.querySelector("#passwordDiv").removeChild(document.querySelector("#new-password-label"))
                        element.replaceChild(newElement, textField);
                    }



        });




    }






    const adminSection = () => {
        
        const adminDiv = document.createElement('div');
        adminDiv.id = 'admin';

        adminDiv.classList.add("cols-start-1")
        const headerDiv = document.createElement('div');
        headerDiv.id = 'header';
        headerDiv.classList.add('mb-24');

        const h1Element = document.createElement('h1');
        h1Element.textContent = 'Create Admin';
        h1Element.classList.add('font-[500]', 'text-6xl');
        headerDiv.appendChild(h1Element);


        const h2Element = document.createElement('h2');
        h2Element.textContent = 'generate an admin account';
        h2Element.classList.add('text-3xl', 'mt-4');
        headerDiv.appendChild(h2Element);

        adminDiv.appendChild(headerDiv);

        const fieldsDiv = document.createElement('div');
        fieldsDiv.id = 'fields';
        fieldsDiv.classList.add('m-4');


        const emailDiv = document.createElement('div');
        emailDiv.id = 'email';
        emailDiv.classList.add('grid', 'grid-cols-4', 'cols-span-1', 'mb-8');


        const emailH3Element = document.createElement('h3');
        emailH3Element.textContent = 'Email';
        emailH3Element.classList.add('font-semibold', 'text-2xl');
        emailDiv.appendChild(emailH3Element);

        const emailLabel = document.createElement('label');
        emailLabel.classList.add('input', 'input-bordered', 'flex', 'items-center', 'gap-2', 'max-w-sm', 'col-span-3');
        emailLabel.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            
        `;

        const emailField = document.createElement("input");
        emailField.className = "grow"
        emailField.placeholder = "Email"
        emailLabel.append(emailField);

        emailDiv.appendChild(emailLabel);

        fieldsDiv.appendChild(emailDiv);

        const passwordDiv = document.createElement('div');
        passwordDiv.id = 'password';
        passwordDiv.classList.add('grid', 'grid-cols-4', 'cols-span-3');

        const passwordH3Element = document.createElement('h3');
        passwordH3Element.textContent = 'Password';
        passwordH3Element.classList.add('font-semibold', 'text-2xl');
        passwordDiv.appendChild(passwordH3Element);

        const passwordLabel = document.createElement('label');
        passwordLabel.classList.add('input', 'input-bordered', 'flex', 'items-center', 'gap-2', 'max-w-sm' , 'col-span-3');
        passwordLabel.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
                <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
            </svg>
            
        `;
        




        const passwordField = document.createElement("input");
        passwordField.className = "grow"
        passwordField.placeholder = "Password"
        passwordLabel.append(passwordField);
        passwordDiv.appendChild(passwordLabel);

        fieldsDiv.appendChild(passwordDiv);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('grid', 'grid-cols-4', 'mt-10');

        const buttonCol = document.createElement('div');
        buttonCol.classList.add('col-start-2', 'col-span-2');
        const createButton = document.createElement('button');
        createButton.classList.add('btn', 'btn-wide', 'max-w-sm');
        createButton.textContent = 'Create Account';
        buttonCol.appendChild(createButton);
        buttonDiv.appendChild(buttonCol);

        fieldsDiv.appendChild(buttonDiv);

        adminDiv.appendChild(fieldsDiv);

        document.querySelector("#sections").appendChild(adminDiv);
        let users = JSON.parse(localStorage.getItem("user")); // Retrieve users from local storage 

        const checkExist =(email) =>{
            if (users.find((user) => user.email === email)) {
                return true;
            }}

        createButton.addEventListener("click", () => {
            console.log(emailField.value.split("@")[0].slice(emailField.length / 2, emailField.length))

            const [firstName, LastName] = emailField.value.split("@")[0].slice(emailField.length / 2, emailField.length)

                const newUser = {
                    id: users.length + 1,
                    firstName,
                    LastName: "ADMIN",
                    email: emailField.value,
                    password: passwordField.value,
                    role: "Admin"

                }
                if (!checkExist(email)) {
                    users.push(newUser)
                    localStorage.setItem('user', JSON.stringify(users));
                }
        });

    }
adminSection();
securityPasswordSection();












    console.log(document.querySelector("#security-password-field").textContent)
    console.log(currentUser.password.length)
    document.querySelector("#security-password-field").textContent = "*".repeat(currentUser.password.length)
    document.querySelector("#security-phone").textContent = currentUser.phone







});

