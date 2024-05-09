document.addEventListener("DOMContentLoaded", async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser.role === "ADMIN") {
    console.log("admin");
    document.querySelector("#nav").innerHTML =
      '<admin-nav name="Wardan" id="nav"> </admin-nav>';
    document.querySelector("#history-icon").className = "hidden";
  } else if (currentUser.role === "CUSTOMER") {
    document.querySelector("#nav").innerHTML =
      '<buyer-nav name="Wardan" id="nav"> </buyer-nav>';
    document.querySelector("#history").href =
      "../buyer/purchase-history/purchase-history.html";
  } else if (currentUser.role === "SELLER") {
    document.querySelector("#nav").innerHTML =
      '<seller-nav name="Wardan" id="nav"> </seller-nav>';
    document.querySelector("#history").href = "../seller/seller-history.html";
  }
  // document.getElementById("nav").setAttribute("name", currentUser.firstName.charAt(0));
  document.getElementById("name2").textContent =
    currentUser.firstName.charAt(0);

  // const navEnd = document.querySelector("#nav-end");

  // const img = document.createElement("img");
  // img.src = "../../media/history.svg";
  // img.className = "w-6 h-6";
  // img.id = "history-icon";
  // navEnd.appendChild(img);

  const securityPhoneSection = () => {
    editButton = document.querySelector("#edit-phone");
    editButton.addEventListener("click", () => {
      if (editButton.textContent === "Edit") {
        var element = editButton.parentNode;
        var h2 = editButton.previousElementSibling;
        var textField = document.createElement("input");
        textField.className =
          "input input-bordered w-full focus:outline-none text-center";
        textField.value = currentUser.phone ? currentUser.phone : "00000";
        textField.setAttribute("id", "phone-textfield");
        element.replaceChild(textField, h2);
        editButton.textContent = "Save";
      } else if (editButton.textContent === "Save") {
        var element = editButton.parentNode;
        var textField = editButton.previousElementSibling;
        var enteredText = textField.value;

        var newElement = document.createElement("h3");
        newElement.className = "text-lg text-center";
        newElement.textContent = enteredText;

        if (enteredText.length) element.replaceChild(newElement, textField);
        currentUser.phone = enteredText;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        let users = JSON.parse(localStorage.getItem("user"));
        users.splice(
          users.findIndex((user) => user.id === currentUser.id),
          1
        );
        users.push(currentUser);
        localStorage.setItem("user", JSON.stringify(users));

        editButton.textContent = "Edit";
      }
    });
  };

  const adminSection = () => {
    const adminDiv = document.createElement("form");
    adminDiv.id = "admin";

    adminDiv.classList.add("cols-start-1");
    const headerDiv = document.createElement("div");
    headerDiv.id = "header";
    headerDiv.classList.add("mb-24");

    const h1Element = document.createElement("h1");
    h1Element.textContent = "Create Admin";
    h1Element.classList.add("font-[500]", "text-6xl");
    headerDiv.appendChild(h1Element);

    const h2Element = document.createElement("h2");
    h2Element.textContent = "generate an admin account";
    h2Element.classList.add("text-3xl", "mt-4");
    headerDiv.appendChild(h2Element);

    adminDiv.appendChild(headerDiv);

    const fieldsDiv = document.createElement("div");
    fieldsDiv.id = "fields";
    fieldsDiv.classList.add("m-4");

    const emailDiv = document.createElement("div");
    emailDiv.id = "email";
    emailDiv.className =
      "grid grid-cols-4 cols-span-1 mb-8 gap-4 -lg:flex -lg:flex-col justify-center items-center";

    const emailH3Element = document.createElement("h3");
    emailH3Element.textContent = "Email";
    emailH3Element.classList.add("font-semibold", "text-2xl");
    emailDiv.appendChild(emailH3Element);

    const emailLabel = document.createElement("label");
    emailLabel.classList.add(
      "input",
      "input-bordered",
      "flex",
      "items-center",
      "gap-2",
      "max-w-sm",
      "col-span-3"
    );
    emailLabel.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            
        `;

    const emailField = document.createElement("input");
    emailField.type = "email";
    emailField.className = "grow";
    emailField.placeholder = "Email";
    emailLabel.append(emailField);

    emailDiv.appendChild(emailLabel);

    fieldsDiv.appendChild(emailDiv);

    const passwordDiv = document.createElement("div");
    passwordDiv.id = "password";
    passwordDiv.className =
      "grid grid-cols-4 cols-span-1 mb-8 gap-8 -lg:flex -lg:flex-col justify-center items-center";

    const passwordH3Element = document.createElement("h3");
    passwordH3Element.textContent = "Password";
    passwordH3Element.classList.add("font-semibold", "text-2xl");
    passwordDiv.appendChild(passwordH3Element);

    const passwordLabel = document.createElement("label");
    passwordLabel.classList.add(
      "input",
      "input-bordered",
      "flex",
      "items-center",
      "gap-2",
      "max-w-sm",
      "col-span-3"
    );
    passwordLabel.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
                <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
            </svg>
            
        `;

    const passwordField = document.createElement("input");
    passwordField.type = "password";
    passwordField.className = "grow";
    passwordField.placeholder = "Password";
    passwordLabel.append(passwordField);
    passwordDiv.appendChild(passwordLabel);

    fieldsDiv.appendChild(passwordDiv);

    const buttonDiv = document.createElement("div");
    buttonDiv.className =
      "grid grid-cols-4 cols-span-1 mb-8 gap-8 -lg:flex -lg:flex-col justify-center items-center";

    const buttonCol = document.createElement("div");
    buttonCol.classList.add("col-start-2", "col-span-2");
    const createButton = document.createElement("button");
    createButton.className =
      "font-semibold text-2xl text-center btn btn-wide bg-custom-red text-white hover:text-white hover:bg-red-700 hover:scale-110 -lg:justify-center";
    createButton.textContent = "Create Account";
    buttonCol.appendChild(createButton);
    buttonDiv.appendChild(buttonCol);

    fieldsDiv.appendChild(buttonDiv);

    adminDiv.appendChild(fieldsDiv);

    document.querySelector("#sections").appendChild(adminDiv);
    let users = JSON.parse(localStorage.getItem("user")); // Retrieve users from local storage

    const checkExist = (email) => {
      if (users.find((user) => user.email === email)) {
        return true;
      }
      return false;
    };

    createButton.addEventListener("click", () => {
      console.log("test");

      const [firstName, LastName] = emailField.value
        .split("@")[0]
        .slice(emailField.length / 2, emailField.length);

      const newUser = {
        id: users.length + 1,
        firstName,
        LastName: LastName,
        email: emailField.value,
        password: passwordField.value,
        role: "Admin",
      };
      if (
        !checkExist(emailField.value) &&
        emailField.value.length !== 0 &&
        passwordField.value.length !== 0
      ) {
        console.log("email not found");
        users.push(newUser);
        localStorage.setItem("user", JSON.stringify(users));
      } else {
        console.log("email found");
      }
    });
  };

  const securitySection = () => {
    securityPasswordSection();
    securityPhoneSection();
  };

  const buyerSection = () => {
    const buyer = document.createElement("div");
    buyer.id = "buyer";

    buyer.classList.add("cols-start-1");
    const headerDiv = document.createElement("div");
    headerDiv.id = "header";
    headerDiv.classList.add("mb-24");

    const h1Element = document.createElement("h1");
    h1Element.textContent = "Balance and Shipping";
    h1Element.classList.add("font-[500]", "text-6xl");
    headerDiv.appendChild(h1Element);

    const h2Element = document.createElement("h2");
    h2Element.textContent = "chhange your balance/shipping details";
    h2Element.classList.add("text-3xl", "mt-4");
    headerDiv.appendChild(h2Element);

    buyer.appendChild(headerDiv);

    const fieldsDiv = document.createElement("div");
    fieldsDiv.id = "fields";
    fieldsDiv.classList.add("m-4");

    const balanceDiv = document.createElement("div");
    balanceDiv.id = "balance";
    balanceDiv.className = "grid grid-cols-3 cols-span-1 mb-8 gap-4";

    const balanceH3Element = document.createElement("h3");
    balanceH3Element.textContent = "Balance";
    balanceH3Element.classList.add("font-semibold", "text-2xl");
    balanceDiv.appendChild(balanceH3Element);

    const balanceLabel = document.createElement("h3");
    balanceLabel.classList.className = "";
    currentUser.balance = currentUser.balance ?? 0;
    balanceLabel.textContent = currentUser.balance;
    balanceDiv.appendChild(balanceLabel);

    const balanceEditButton = document.createElement("button");
    balanceEditButton.className =
      "font-semibold text-2xl text-center btn btn-wide bg-custom-red text-white hover:text-white w-24 hover:bg-red-700 hover:scale-110";
    balanceEditButton.textContent = "Edit";
    balanceEditButton.id = "balance-edit";
    balanceDiv.appendChild(balanceEditButton);

    fieldsDiv.appendChild(balanceDiv);

    balanceEditButton.addEventListener("click", () => {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let users = JSON.parse(localStorage.getItem("user")); // Retrieve users from local storage

      if (balanceEditButton.textContent === "Edit") {
        var element = balanceEditButton.parentNode;
        var h2 = balanceEditButton.previousElementSibling;
        var textField = document.createElement("input");
        textField.setAttribute("type", "text");
        textField.className =
          "mr-3.5 input input-bordered w-full max-w-xs focus:outline-none text-center";
        textField.setAttribute("id", "textField");
        textField.setAttribute("placeholder", h2.textContent);
        textField.value = currentUser.balance;
        element.replaceChild(textField, h2);

        balanceEditButton.textContent = "Save";
      } else if (balanceEditButton.textContent === "Save") {
        var element = balanceEditButton.parentNode;
        var textField = balanceEditButton.previousElementSibling;
        var enteredText = textField.value;

        var newElement = document.createElement("h3");
        newElement.setAttribute("class", "text-lg");
        newElement.textContent = enteredText;

        element.replaceChild(newElement, textField);

        if (balanceEditButton.parentNode.id === "balance") {
          users.find((user) => user.id == currentUser.id).balance = enteredText;
        }
        const newCurrentUser = users.find((user) => user.id == currentUser.id);
        localStorage.setItem("currentUser", JSON.stringify(newCurrentUser));
        currentUser = JSON.parse(localStorage.getItem("currentUser"));

        users.splice(
          users.findIndex((user) => user.id === currentUser.id),
          1
        );
        users.push(currentUser);
        localStorage.setItem("user", JSON.stringify(users));

        balanceEditButton.textContent = "Edit";
      }
    });

    const addressDiv = document.createElement("div");
    addressDiv.id = "address-div";
    addressDiv.className =
      "bg-custom-gray min-w-fit border-4 border-dashed border-slate-300 p-4 gap-2 place-items-center rounded-2xl -md:w-full ";

    const shippingAddress = document.createElement("h3");
    shippingAddress.textContent = "Shipping Address";
    shippingAddress.classList.add("font-semibold", "text-2xl", "text-center");
    addressDiv.appendChild(shippingAddress);

    const addressesDiv = document.createElement("div");
    addressesDiv.id = "addresses-div";
    addressesDiv.className =
      "flex flex-wrap gap-2 -xl:flex -xl:flex-col items-center justify-center overflow-auto max-h-96 my-6";

    fieldsDiv.appendChild(addressDiv);
    addressDiv.appendChild(addressesDiv);
    buyer.appendChild(fieldsDiv);
    document.querySelector("#sections").appendChild(buyer);

    if (currentUser.addresses.length !== 0) {
      currentUser.addresses.forEach((address) => {
        renderAddress(address);
      });
    } else {
      const noAddress = document.createElement("h1");
      noAddress.textContent = "No Address";
      noAddress.className = "font-medium text-lg";
      addressesDiv.appendChild(noAddress);
    }
    const addAddressDiv = document.createElement("div");
    addAddressDiv.id = "add-address";
    addAddressDiv.className = "flex justify-center";
    const addAddressButton = document.createElement("button");
    addAddressButton.textContent = "Add Address";
    addAddressButton.className =
      "font-semibold text-2xl text-center btn btn-wide bg-custom-red text-white hover:text-white w-60 hover:bg-red-700 hover:scale-110";
    addAddressDiv.appendChild(addAddressButton);
    addressDiv.appendChild(addAddressDiv);
    addAddressButton.addEventListener("click", () => {
      addressPopup(null);
    });
  };

  const sellerSection = () => {
    const seller = document.createElement("div");
    seller.id = "seller";

    seller.className = "cols-start-1 w-full";
    const headerDiv = document.createElement("div");
    headerDiv.id = "header";
    headerDiv.classList.add("mb-24");

    const h1Element = document.createElement("h1");
    h1Element.textContent = "Bank Account";
    h1Element.classList.add("font-[500]", "text-6xl");
    headerDiv.appendChild(h1Element);

    const h2Element = document.createElement("h2");
    h2Element.textContent = "change your Bank account details";
    h2Element.classList.add("text-3xl", "mt-4");
    headerDiv.appendChild(h2Element);

    seller.appendChild(headerDiv);

    const fieldsDiv = document.createElement("div");
    fieldsDiv.id = "fields";
    fieldsDiv.classList.add("m-4");

    const ibanDiv = document.createElement("div");
    ibanDiv.id = "iban";
    ibanDiv.classList.add("grid", "grid-cols-4", "cols-span-1", "mb-8");

    const ibanH3Element = document.createElement("h3");
    ibanH3Element.textContent = "IBAN";
    ibanH3Element.classList.add("font-semibold", "text-2xl");
    ibanDiv.appendChild(ibanH3Element);

    const IBANLabel = document.createElement("h3");
    IBANLabel.classList.className = "";
    IBANLabel.textContent = currentUser.bank.iban;
    ibanDiv.appendChild(IBANLabel);

    const IbanEditButton = document.createElement("button");
    IbanEditButton.className =
      "font-semibold text-2xl text-center btn btn-wide bg-custom-red text-white hover:text-white w-24 hover:bg-red-700 hover:scale-110";
    IbanEditButton.textContent = "Edit";
    IbanEditButton.id = "iban-edit";
    ibanDiv.appendChild(IbanEditButton);

    fieldsDiv.appendChild(ibanDiv);
    seller.appendChild(fieldsDiv);

    IbanEditButton.addEventListener("click", () => {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let users = JSON.parse(localStorage.getItem("user")); // Retrieve users from local storage

      if (IbanEditButton.textContent === "Edit") {
        var element = IbanEditButton.parentNode;
        var h2 = IbanEditButton.previousElementSibling;
        var textField = document.createElement("input");
        textField.setAttribute("type", "text");
        textField.className = "mr-3.5";
        textField.setAttribute("id", "textField");
        textField.setAttribute("placeholder", h2.textContent);
        element.replaceChild(textField, h2);

        IbanEditButton.textContent = "Save";
      } else if (IbanEditButton.textContent === "Save") {
        var element = IbanEditButton.parentNode;
        var textField = IbanEditButton.previousElementSibling;
        var enteredText = textField.value;

        var newElement = document.createElement("h3");
        newElement.setAttribute("class", "text-lg");
        newElement.textContent = enteredText;

        element.replaceChild(newElement, textField);

        if (IbanEditButton.parentNode.id === "iban") {
          users.find((user) => user.id == currentUser.id).bank.iban =
            enteredText;
        }
        const newCurrentUser = users.find((user) => user.id == currentUser.id);
        localStorage.setItem("currentUser", JSON.stringify(newCurrentUser));
        currentUser = JSON.parse(localStorage.getItem("currentUser"));

        // Save the updated users array back to local storage
        localStorage.setItem("user", JSON.stringify(users));

        IbanEditButton.textContent = "Edit";
      }
    });

    document.querySelector("#sections").appendChild(seller);
  };

  const renderAddress = (userAddress) => {
    const addressCard = document.createElement("div");
    addressCard.id = "address-card";
    addressCard.className =
      "drop-shadow-lg bg-white min-w-fit max-w-64 w-1/2 rounded-2xl p-8 m-4 cursor-pointer";

    const titleDiv = document.createElement("div");
    titleDiv.id = "title-div";
    titleDiv.className = "grid grid-cols-4 ";

    const locationImg = document.createElement("img");
    locationImg.src = "../../media/location-black.svg";
    locationImg.className = "w-6";

    const title = document.createElement("h1");
    title.id = "title";
    title.className = "font-bold text-2xl col-span-3";
    title.textContent = userAddress.name;

    titleDiv.appendChild(locationImg);
    titleDiv.appendChild(title);

    const address = document.createElement("div");
    address.id = "address";
    address.className = "py-5";

    const streetDiv = document.createElement("div");
    streetDiv.id = "street-div";
    streetDiv.className = "flex";

    const streetLabel = document.createElement("h1");
    streetLabel.textContent = "Street: ";
    streetLabel.className = "font-semibold px-2";

    const street = document.createElement("h1");
    street.id = "street";
    street.textContent = userAddress.address.address;
    street.className = "";

    streetDiv.appendChild(streetLabel);
    streetDiv.appendChild(street);
    address.appendChild(streetDiv);

    const cityDiv = document.createElement("div");
    cityDiv.id = "street-div";
    cityDiv.className = "flex";

    const cityLabel = document.createElement("h1");
    cityLabel.textContent = "City: ";
    cityLabel.className = "font-semibold px-2";

    const city = document.createElement("h1");
    city.id = "city";
    city.textContent = userAddress.address.city;
    city.className = "";

    cityDiv.appendChild(cityLabel);
    cityDiv.appendChild(city);
    address.appendChild(cityDiv);

    const stateDiv = document.createElement("div");
    stateDiv.id = "street-div";
    stateDiv.className = "flex";

    const statelabel = document.createElement("h1");
    statelabel.textContent = "State: ";
    statelabel.className = "font-semibold px-2";

    const state = document.createElement("h1");
    state.id = "state";
    state.textContent = userAddress.address.state;
    state.className = "";

    stateDiv.appendChild(statelabel);
    stateDiv.appendChild(state);
    address.appendChild(stateDiv);

    const postalCodeDiv = document.createElement("div");
    postalCodeDiv.id = "postal-code-div";
    postalCodeDiv.className = "flex";

    const postalCodeLabel = document.createElement("h1");
    postalCodeLabel.textContent = "Postal Code: ";
    postalCodeLabel.className = "font-semibold px-2";

    const postalCode = document.createElement("h1");
    postalCode.id = "postal-code";
    postalCode.textContent = userAddress.address.postalCode;
    postalCode.className = "";

    postalCodeDiv.appendChild(postalCodeLabel);
    postalCodeDiv.appendChild(postalCode);
    address.appendChild(postalCodeDiv);

    addressCard.appendChild(titleDiv);
    addressCard.appendChild(address);

    addressCard.addEventListener("click", (event) => addressPopup(userAddress));

    // console.log(document.querySelector("#address-div"));
    document.querySelector("#addresses-div").appendChild(addressCard);
  };
  function addressPopup(address) {
    let editMode = true;
    if (!address) {
      address = {
        name: "",
        address: {
          address: "",
          city: "",
          coordinates: {
            lat: 0,
            lng: 0,
          },
          postalCode: "",
          state: "",
          name: "",
        },
      };
      editMode = false;
    }
    const addressName = address.name;
    const overlay = document.createElement("div");
    overlay.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "w-full",
      "bg-black",
      "h-full",
      "opacity-50",
      "z-50"
    );
    overlay.id = "overlay";

    const popup = document.createElement("div");
    popup.classList.add(
      "fixed",
      "top-1/2",
      "left-1/2",
      "transform",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "bg-white",
      "p-6",
      "rounded-2xl",
      "shadow-lg",
      "z-50",
      "w-fit"
    );
    popup.id = "popup";

    const editAddressDiv = document.createElement("div");
    editAddressDiv.id = "edit-address-div";
    editAddressDiv.className = "flex justify-between max-w-2xl";
    const editAddressLabel = document.createElement("h1");
    editAddressLabel.id = "edit-address-label";
    editAddressLabel.textContent = editMode ? "Edit Address" : "Add Address";
    editAddressLabel.className = "font-bold text-2xl ";

    const closeImg = document.createElement("img");
    closeImg.src = "../../media/x-close.svg";
    closeImg.className = "cursor-pointer cols-start-2";
    closeImg.id = "closePopup";

    const editAddressDetail = document.createElement("h1");
    editAddressDetail.id = "edit-address-detail";
    editAddressDetail.textContent = editMode
      ? "Edit your shipping Address"
      : "Add a new shipping Address";
    editAddressDetail.className = "font-medium text-lg";

    editAddressDiv.appendChild(editAddressLabel);
    editAddressDiv.appendChild(closeImg);

    popup.appendChild(editAddressDiv);
    popup.appendChild(editAddressDetail);

    const form = document.createElement("form");
    form.className = "py-4 max-w-2xl min-w-[30rem]";

    const nicknameLabel = document.createElement("label");
    nicknameLabel.textContent = "Nickname";
    nicknameLabel.className = "block";
    const nicknameInput = document.createElement("input");
    nicknameInput.type = "text";
    nicknameInput.value = address.name;
    nicknameInput.className = "input input-bordered input-md w-full w-md";

    const addressLabel = document.createElement("label");
    addressLabel.textContent = "Address Street";
    addressLabel.className = "block mt-4";
    const addressInput = document.createElement("input");
    addressInput.type = "text";
    addressInput.value = address.address.address || "";
    addressInput.className = "input input-bordered input-md w-full max-w-2xl";

    const cityLabel = document.createElement("label");
    cityLabel.textContent = "City";
    cityLabel.className = "block mt-4";
    const cityInput = document.createElement("input");
    cityInput.type = "text";
    cityInput.value = address.address.city;
    cityInput.className = "input input-bordered input-md w-full max-w-2xl ";

    const stateLabel = document.createElement("label");
    stateLabel.textContent = "State";
    stateLabel.className = "block mt-4";
    const stateInput = document.createElement("input");
    stateInput.type = "text";
    stateInput.value = address.address.state;
    stateInput.className = "input input-bordered input-md w-full max-w-2xl";

    const postalCodeLabel = document.createElement("label");
    postalCodeLabel.textContent = "Postal Code";
    postalCodeLabel.className = "block mt-4";
    const postalCodeInput = document.createElement("input");
    postalCodeInput.type = "text";
    postalCodeInput.value = address.address.postalCode;
    postalCodeInput.className =
      "input input-bordered input-md w-full max-w-2xl ";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className =
      " btn btn-wide mt-4 bg-red-600 text-white w-60 hover:bg-red-600 hover:scale-105 hover:opacity-75 w-full";

    const confirmButton = document.createElement("button");
    confirmButton.textContent = editMode ? "Confirm" : "Add";
    confirmButton.className =
      "btn btn-wide mt-4 bg-green-600 text-white w-60 hover:bg-green-600 hover:scale-105 hover:opacity-75 w-full";
    confirmButton.type = "submit";

    form.appendChild(nicknameLabel);
    form.appendChild(nicknameInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(addressLabel);
    form.appendChild(addressInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(cityLabel);
    form.appendChild(cityInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(stateLabel);
    form.appendChild(stateInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(postalCodeLabel);
    form.appendChild(postalCodeInput);
    form.appendChild(confirmButton);
    if (editMode) form.appendChild(deleteButton);

    popup.appendChild(form);

    nicknameInput.addEventListener("input", () => {
      console.log(nicknameInput.value);
      console.log(addressName);
      const addressIndex = currentUser.addresses.findIndex(
        (address) => address.name === addressName
      );
      console.log(currentUser.addresses[addressIndex]);
      if (addressIndex !== -1) {
        console.log(nicknameInput.value);

        // currentUser.addresses[addressIndex].name = nicknameInput.value;
        // console.log(currentUser.addresses[addressIndex].name)
        // localStorage.setItem("currentUser", JSON.stringify(currentUser));
        // console.log("currentUser: ", currentUser)
      }
    });

    addressInput.addEventListener("input", () => {
      console.log(addressInput.value);
    });
    cityInput.addEventListener("input", () => {
      console.log(cityInput.value);
    });
    stateInput.addEventListener("input", () => {
      console.log(stateInput.value);
    });
    postalCodeInput.addEventListener("input", () => {
      console.log(postalCodeInput.value);
    });

    confirmButton.addEventListener("click", () => {
      if (
        !nicknameInput.value ||
        !addressInput.value ||
        !cityInput.value ||
        !stateInput.value ||
        !postalCodeInput.value
      ) {
        alert("Please fill in all fields");
        return;
      }
      let users = JSON.parse(localStorage.getItem("user"));

      const addressIndex = currentUser.addresses.findIndex(
        (address) => address.name === addressName
      );
      if (addressIndex !== -1) {
        currentUser.addresses[addressIndex].name = nicknameInput.value;
        currentUser.addresses[addressIndex].address.address =
          addressInput.value;
        currentUser.addresses[addressIndex].address.city = cityInput.value;
        currentUser.addresses[addressIndex].address.state = stateInput.value;
        currentUser.addresses[addressIndex].address.postalCode =
          postalCodeInput.value;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        users.splice(
          users.findIndex((user) => user.id === currentUser.id),
          1,
          currentUser
        );
        localStorage.setItem("user", JSON.stringify(users));
      } else {
        const newAddress = {
          name: nicknameInput.value,
          address: {
            address: addressInput.value,
            city: cityInput.value,
            state: stateInput.value,
            postalCode: postalCodeInput.value,
          },
        };
        currentUser.addresses.push(newAddress);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        users.splice(
          users.findIndex((user) => user.id === currentUser.id),
          1
        );
        users.push(currentUser);
        localStorage.setItem("user", JSON.stringify(users));
      }
    });

    deleteButton.addEventListener("click", () => {
      const addressIndex = currentUser.addresses.findIndex(
        (address) => address.name === addressName
      );
      currentUser.addresses.splice(addressIndex, 1);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    });

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    document.getElementById("closePopup").addEventListener("click", () => {
      overlay.remove();
      popup.remove();
    });
  }

  function passwordPopup(address) {
    let editMode = true;
    if (!address) {
      address = {
        name: "",
        address: {
          address: "",
          city: "",
          coordinates: {
            lat: 0,
            lng: 0,
          },
          postalCode: "",
          state: "",
          name: "",
        },
      };
      editMode = false;
    }
    const addressName = address.name;
    const overlay = document.createElement("div");
    overlay.classList.add(
      "fixed",
      "top-0",
      "left-0",
      "w-full",
      "bg-black",
      "h-full",
      "opacity-50",
      "z-50"
    );
    overlay.id = "overlay";

    const popup = document.createElement("div");
    popup.classList.add(
      "fixed",
      "top-1/2",
      "left-1/2",
      "transform",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "bg-white",
      "p-6",
      "rounded-2xl",
      "shadow-lg",
      "z-50",
      "w-fit"
    );
    popup.id = "popup";

    const editPasswordDiv = document.createElement("div");
    editPasswordDiv.id = "edit-password-div";
    editPasswordDiv.className = "flex justify-between max-w-2xl";
    const editPasswordLabel = document.createElement("h1");
    editPasswordLabel.id = "edit-password-label";
    editPasswordLabel.textContent = "Change Password";
    editPasswordLabel.className = "font-bold text-2xl ";

    const closeImg = document.createElement("img");
    closeImg.src = "../../media/x-close.svg";
    closeImg.className = "cursor-pointer cols-start-2";
    closeImg.id = "closePopup";

    const editPasswordDetail = document.createElement("h1");
    editPasswordDetail.id = "edit-password-detail";
    editPasswordDetail.textContent = "Change your password";
    editPasswordDetail.className = "font-medium text-lg";

    editPasswordDiv.appendChild(editPasswordLabel);
    editPasswordDiv.appendChild(closeImg);

    popup.appendChild(editPasswordDiv);
    popup.appendChild(editPasswordDetail);

    const form = document.createElement("form");
    form.className = "py-4 max-w-2xl min-w-[30rem]";

    const CurrentPasswordLabel = document.createElement("label");
    CurrentPasswordLabel.textContent = "Current Password";
    CurrentPasswordLabel.className = "block";
    const currentPasswordInput = document.createElement("input");
    currentPasswordInput.type = "password";
    currentPasswordInput.value = "";
    currentPasswordInput.className =
      "input input-bordered input-md w-full w-md";

    const newPaswordLabel = document.createElement("label");
    newPaswordLabel.textContent = "New Password";
    newPaswordLabel.className = "block mt-4";
    const newPasswordInput = document.createElement("input");
    newPasswordInput.type = "password";
    newPasswordInput.value = "";
    newPasswordInput.className =
      "input input-bordered input-md w-full max-w-2xl";

    const newPasswordLabelAgain = document.createElement("label");
    newPasswordLabelAgain.textContent = "Re-enter new Password";
    newPasswordLabelAgain.className = "block mt-4";
    const newPasswordInputAgain = document.createElement("input");
    newPasswordInputAgain.type = "password";
    newPasswordInputAgain.value = "";
    newPasswordInputAgain.className =
      "input input-bordered input-md w-full max-w-2xl";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className =
      " btn btn-wide mt-4 bg-red-600 text-white w-60 hover:bg-red-600 hover:scale-105 hover:opacity-75 w-full";

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.className =
      "btn btn-wide mt-4 bg-green-600 text-white w-60 hover:bg-green-600 hover:scale-105 hover:opacity-75 w-full";
    confirmButton.type = "submit";

    closeImg.addEventListener("click", () => {
      overlay.remove();
      popup.remove();
    });
    cancelButton.addEventListener("click", () => {
      overlay.remove();
      popup.remove();
    });

    confirmButton.addEventListener("click", () => {
      if (
        !currentPasswordInput.value ||
        !newPasswordInput.value ||
        !newPasswordInputAgain.value
      ) {
        alert("Please fill in all fields");

        return;
      }
      if (currentUser.password !== currentPasswordInput.value) {
        alert("Incorrect current password");
        return;
      }
      if (newPasswordInput.value !== newPasswordInputAgain.value) {
        alert("new Passwords do not match");
        return;
      }
      currentUser.password = newPasswordInput.value;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      let users = JSON.parse(localStorage.getItem("user"));
      users.splice(
        users.findIndex((user) => user.id === currentUser.id),
        1
      );
      users.push(currentUser);
      localStorage.setItem("user", JSON.stringify(users));
    });

    form.appendChild(CurrentPasswordLabel);
    form.appendChild(currentPasswordInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(newPaswordLabel);
    form.appendChild(newPasswordInput);
    form.appendChild(newPasswordLabelAgain);
    form.appendChild(newPasswordInputAgain);

    form.appendChild(document.createElement("br"));

    form.appendChild(cancelButton);
    form.appendChild(confirmButton);

    popup.appendChild(form);
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  }
  const securityPasswordSection = () => {
    const passwordField = document.querySelector("#security-password-field");
    const phoneField = document.querySelector("#phone-password");
    const editButton = document.querySelector("#edit-password");

    editButton.addEventListener("click", () => {
      passwordPopup(currentUser);
    });
  };

  if (currentUser.role === "ADMIN") adminSection();
  if (currentUser.role === "CUSTOMER") buyerSection();
  if (currentUser.role === "SELLER") sellerSection();

  securitySection();

  document.querySelector("#security-password-field").textContent = "*".repeat(
    currentUser.password.length
  );
  document.querySelector("#security-phone").textContent = currentUser.phone;
});
