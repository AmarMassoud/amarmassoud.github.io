

document.addEventListener("DOMContentLoaded", async () => {

    let cartItemsLs = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = []
    const cartItemsResponse = await fetch('/api/cartitems').then(res => res.json()).then(data => cartItems = data);
    let currentUserId = JSON.parse(localStorage.getItem('currentUser')) || {};
    let currentUser = {}
    const currentUserResponse = await fetch(`/api/user/${currentUserId}`).then(res => res.json()).then(data => currentUser = data);
    let products = []
    const productsResponse = fetch('/api/products').then(res => res.json()).then(data => products = data);

    cartItems = cartItems.filter(item => (item.customer === currentUserId)&&(item.dealId===null));

    if (cartItemsLs.length !== 0 && currentUserId !== "-1") {
        cartItemsLs.forEach(cartItem => {
            addToCart(cartItem.product, cartItem.quantity)
        })
    }
// const select = document.getElementById("nav");
    console.log(currentUser.firstName)
// select.setAttribute("name",currentUser.firstName)
    let checkoutStepNumber = 1;
    let paymentMethod = 1;
    let addAddress = false;
    let selectedAddress = null;

    const renderCartItem = (cartItem) => {
        // let desiredQuantity=1;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'grid grid-cols-10  border-b-2  border-gray-300 py-5 ';
        const productInStock = cartItem.product.stock >= 1;


        const productDetailsDiv = document.createElement('div');
        productDetailsDiv.className = 'col-start-1 col-end-6 flex gap-10  items-center wrap -sm:flex -sm:flex-col  -sm:items-start -sm:justify-center -sm:gap-2 -sm:col-start-1 -sm:col-end-5'
        const productName = document.createElement('p');
        productName.textContent = cartItem.product.title
        productName.className = 'text-lg font-semibold';
        const productImg = document.createElement('img');
        productImg.src = cartItem.product.thumbnail;
        productImg.className = 'max-h-28 max-w-28 rounded-lg bg-custom-gray p-1';

        productDetailsDiv.appendChild(productImg);
        productDetailsDiv.appendChild(productName);

        // const quantity
        const quantityDiv = document.createElement("div");
        quantityDiv.className = "flex flex-col space-y-0 col-span-2 items-center justify-center"
        const quantity = document.createElement("p");
        // quantity.textContent=currentProduct.textContent=currentProduct.stock +" items left";
        quantity.textContent = "Availability:";
        quantity.className = " text-xl "

        // quantityDiv.appendChild(quantity);
        const containerDiv = document.createElement('div');
        containerDiv.className = 'custom-number-input h-10 w-32 ';


        const flexDiv = document.createElement('div');
        flexDiv.className = 'flex flex-row   h-10 w-fit rounded-lg relative bg-custom-gray  border ' + (productInStock ? "" : "opacity-50");


        const decrementButton = document.createElement('button');
        decrementButton.className = `${(productInStock ? `hover:bg-zinc-300` : `hover:cursor-default`)} h-full w-10 rounded-l `;
        decrementButton.innerHTML = `<span class="m-auto text-2xl  font-thin text-gray-600  ${(productInStock ? `hover:text-black ` : ``)}">-</span>`;

        const input = document.createElement('input');
        input.type = 'counter';
        input.readOnly = true;
        input.className = ' outline-none text-center w-10 bg-white font-semibold text-md  focus:text-black md:text-base cursor-default flex items-center text-gray-700';
        input.value = (productInStock ? cartItem.quantity : "X");

        const incrementButton = document.createElement('button');
        incrementButton.className = `${(productInStock ? `hover:bg-zinc-300` : `hover:cursor-default`)} h-full w-10 rounded-l `;
        incrementButton.innerHTML = `<span class="m-auto text-2xl  font-thin text-gray-600  ${(productInStock ? `hover:text-black` : ``)}">+</span>`;
        decrementButton.addEventListener("click", () => {
                // if(cartItem.quantity>1)
                // cartItems.find(item=>item.product.id===cartItem.product.id).quantity-=1;
                // localStorage.setItem('cart',JSON.stringify(cartItems));
                addToCart(cartItem.product, -1)
                renderCheckout()
                renderCartItems()

            }
        );
        incrementButton.addEventListener("click", () => {
            //     if(cartItem.quantity<cartItem.product.stock)
            //     cartItems.find(item=>item.product.id===cartItem.product.id).quantity+=1;
            // localStorage.setItem('cart',JSON.stringify(cartItems));
            addToCart(cartItem.product, 1)
            renderCheckout()

            renderCartItems()
        })

        //   incrementQuantity(desiredQuantity, cartItem.product.stock)  


        flexDiv.appendChild(decrementButton);
        flexDiv.appendChild(input);
        flexDiv.appendChild(incrementButton);

        // containerDiv.appendChild(inStock);
        containerDiv.appendChild(flexDiv);

        quantityDiv.appendChild(containerDiv);


        const totalPrice = document.createElement('p');
        totalPrice.textContent = '$' + cartItem.product.price * cartItem.quantity;
        totalPrice.className = "text-lg font-semibold col-span-2 text-center m-auto -sm:col-start-7 -sm:col-end-9"
        const removeButton = document.createElement('img');
        removeButton.src = "/media/deleteXIcon.svg";
        removeButton.className = "h-5 w-5 cursor-pointer  m-auto hover:scale-110"

        itemDiv.appendChild(productDetailsDiv);
        itemDiv.appendChild(quantityDiv);
        itemDiv.appendChild(totalPrice);
        itemDiv.appendChild(removeButton)

        removeButton.addEventListener('click', () => {
            const isLoggedIn = currentUserId !== "-1";
            if (isLoggedIn) {
                const deleteCartItemResponse = fetch(`/api/cartitems/${cartItem.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                cartItems = cartItems.filter(item => (item.product !== cartItem.product.id) && (item.customer !== currentUserId));
                localStorage.setItem('cart', JSON.stringify(cartItems));
            }

            renderCartItems()


        })

        return itemDiv;
    }

    const cartTotal = () => {
        const totalDiv = document.querySelector('#cart-total');
        // const total=cartItems.reduce((acc,item)=>acc+item.product.price*item.quantity,0);
        let total = 0;
        const isLoggedIn = currentUserId !== "-1";
        if (isLoggedIn) {
            total = cartItems.filter(item => item.customer === currentUser.id).reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        } else {
            total = cartItems.filter(item => item.customer === currentUser.id).reduce((acc, item) => acc + products.find(product => product.id === item.product).price * item.quantity, 0);
        }

        totalDiv.textContent = '$' + total;

    }

    const renderCartItems = () => {


        const CartItemsDiv = document.querySelector('#cart-items');
        CartItemsDiv.replaceChildren();
        if (cartItems.length !== 0) {
            cartItems.forEach(cartItem => {
                CartItemsDiv.appendChild(renderCartItem(cartItem));
            })
            cartTotal()
        } else {

            const emptyCartDiv = document.createElement('div');
            emptyCartDiv.className = 'flex flex-col items-center justify-center h-full';
            const emptyCartImg = document.createElement('img');
            emptyCartImg.src = '/media/shopping-cart.svg';
            emptyCartImg.className = 'h-40 w-40 opacity-10 '
            const emptyCartText = document.createElement('p');
            emptyCartText.textContent = 'Your cart is empty';
            emptyCartText.className = 'text-xl font-bold text-black text-opacity-10'
            emptyCartDiv.appendChild(emptyCartImg);
            emptyCartDiv.appendChild(emptyCartText);
            CartItemsDiv.appendChild(emptyCartDiv);


            const totalDiv = document.querySelector('#cart-total-h');
            totalDiv.textContent = ''

        }
    }


    const renderShippingAddress = (address) => {
        const shippingAddressDiv = document.createElement('div');
        shippingAddressDiv.className = 'flex gap-8 border-b-[.01rem] border-gray-100 pb-4 text-white pt-4 mx-1 hover:scale-105 cursor-pointer';
        const addressImg = document.createElement('img');
        addressImg.src = '/media/address-icon.svg'
        addressImg.className = 'h-10 w-10 my-auto'

        const addressInfo = document.createElement('div');
        const addressTitle = document.createElement('p');
        addressTitle.className = "text-xl font-bold";
        addressTitle.textContent = address.name

        const addressCity = document.createElement('p');
        addressCity.textContent = address.address.city;
        const addressStreet = document.createElement('p');
        addressStreet.textContent = address.address.address;


        addressInfo.appendChild(addressTitle);
        addressInfo.appendChild(addressCity);
        addressInfo.appendChild(addressStreet);

        shippingAddressDiv.appendChild(addressImg);
        shippingAddressDiv.appendChild(addressInfo);

        shippingAddressDiv.addEventListener('click', () => {
            selectedAddress = address;
            checkoutStepNumber = 2;
            renderCheckout();
        })

        return shippingAddressDiv;
    }

    const renderShippingInfo = () => {
        let shippingAddresses = currentUser.addresses || [];
        console.log(currentUser)
        console.log(shippingAddresses)
        const shippingInfoDiv = document.createElement('div');
// shippingInfoDiv.className='relative h-full'
        if (currentUserId !== "-1") {

            console.log(currentUser, 'user id')
            if (shippingAddresses.length !== 0) {

                shippingAddresses.forEach(address => {
                    shippingInfoDiv.appendChild(renderShippingAddress(address));
                })
            } else {
                const noAddresses = document.createElement('p');
                noAddresses.textContent = "you don't have any saved addresses, please add one to continue";
                noAddresses.className = "text-xl font-bold text-center mx-auto mt-20 my-auto text-white text-opacity-75";
                // shippingInfoDiv.className='h-full'
                shippingInfoDiv.appendChild(noAddresses);

            }


        } else {

            const noAddresses = document.createElement('p');
            noAddresses.textContent = "Please Login to continue";
            noAddresses.className = "text-xl font-bold text-center mx-auto mt-20 my-auto text-white text-opacity-75";
            // shippingInfoDiv.className='h-full'
            const loginButton = document.createElement('a');
            loginButton.textContent = 'Login';
            loginButton.className = 'bg-white text-custom-red font-semibold py-2 rounded-3xl hover:bg-opacity-90 mt-10 px-5';
            loginButton.href = '/login.html';
            shippingInfoDiv.className = 'flex flex-col items-center justify-center';
            shippingInfoDiv.appendChild(noAddresses);
            shippingInfoDiv.appendChild(loginButton);


        }
        if (addAddress) {
            shippingInfoDiv.replaceChildren();
            shippingInfoDiv.appendChild(renderAddAddress());

        }


        const addAddressButton = document.createElement('img');
        addAddressButton.src = '/media/add-address-btn.svg';
        addAddressButton.className = 'h-20 w-20 my-auto mx-auto cursor-pointer hover:scale-105 absolute bottom-0 right-0 mb-4 ml-4 px-4 py-2'
        addAddressButton.addEventListener('click', () => {
            // shippingInfoDiv.replaceChildren();
            // shippingInfoDiv.appendChild(renderAddAddress());
            addAddress = true;
            renderCheckout();

        })
        if (!addAddress && currentUserId !== "-1") {
            shippingInfoDiv.appendChild(addAddressButton);
        }


        return shippingInfoDiv;

    }

    const renderAddAddress = () => {
        const addAddressForm = document.createElement('form');
        addAddressForm.className = 'flex flex-col gap-4 text-white mt-8';


        const addressNicknameContainer = document.createElement('div');
        const addressNicknameDiv = document.createElement('div');
        addressNicknameDiv.className = 'flex flex-col gap-1 ';

        const addressNicknameLabel = document.createElement('label');

        const addressNickname = document.createElement('input');
        addressNickname.id = 'address-nickname';
        addressNickname.placeholder = 'Home';
        addressNickname.className = 'input  placeholder-white placeholder-opacity-50 outline-none  focus:outline-none focus:border-none  required';
        addressNicknameLabel.className = 'text-sm font-semibold  ';
        addressNicknameLabel.textContent = 'Address Nickname';
        addressNicknameContainer.appendChild(addressNickname);
        addressNicknameContainer.className = 'border-b border-white grid grid-cols-1 ';
        addressNicknameDiv.appendChild(addressNicknameLabel);
        addressNicknameDiv.appendChild(addressNicknameContainer);


        const streetAddressContainer = document.createElement('div');
        const streetAddressDiv = document.createElement('div');
        addressNicknameDiv.className = 'flex flex-col gap-1 ';

        const streetAddressLabel = document.createElement('label');

        const streetAddress = document.createElement('input');
        streetAddress.id = 'street-address';
        streetAddress.placeholder = '123 Main St.';
        streetAddress.className = 'input  placeholder-white placeholder-opacity-50 outline-none  focus:outline-none focus:border-none  ';
        streetAddressLabel.className = 'text-sm font-semibold ';
        streetAddressLabel.textContent = 'Street Address';
        streetAddressContainer.appendChild(streetAddress);
        streetAddressContainer.className = 'border-b border-white grid grid-cols-1 ';
        streetAddressDiv.appendChild(streetAddressLabel);
        streetAddressDiv.appendChild(streetAddressContainer)


        const stateContainer = document.createElement('div');
        const stateDiv = document.createElement('div');
        stateDiv.className = 'flex flex-col gap-1 ';

        const stateLabel = document.createElement('label');

        const state = document.createElement('input');
        state.id = 'state';
        state.placeholder = 'Florida';
        state.className = 'input  placeholder-white  placeholder-opacity-50 outline-none  focus:outline-none focus:border-none  ';
        stateLabel.className = 'text-sm  font-semibold';
        stateLabel.textContent = 'State';
        stateContainer.appendChild(state);
        stateContainer.className = 'border-b border-white grid grid-cols-1 ';
        stateDiv.appendChild(stateLabel);
        stateDiv.appendChild(stateContainer)


        const zipAndCityDiv = document.createElement('div');
        zipAndCityDiv.className = 'grid grid-cols-2 gap-4';


        const zipContainer = document.createElement('div');
        const zipDiv = document.createElement('div');
        zipDiv.className = 'flex flex-col gap-1 ';

        const zipLabel = document.createElement('label');

        const zip = document.createElement('input');
        zip.id = 'zip';
        zip.placeholder = 'postal code';
        zip.className = 'input  placeholder-white placeholder-opacity-50 outline-none  focus:outline-none focus:border-none  ';
        zipLabel.className = 'text-sm  font-semibold';
        zipLabel.textContent = 'Zip / Postal Code';
        zipContainer.appendChild(zip);
        zipContainer.className = 'border-b border-white grid grid-cols-1 ';
        zipDiv.appendChild(zipLabel);
        zipDiv.appendChild(zipContainer)


        const cityContainer = document.createElement('div');
        const cityDiv = document.createElement('div');
        cityDiv.className = 'flex flex-col gap-1 ';

        const cityLabel = document.createElement('label');

        const city = document.createElement('input');
        city.id = 'city';
        city.placeholder = 'City';
        city.className = 'input  placeholder-white placeholder-opacity-50 outline-none  focus:outline-none focus:border-none  ';
        cityLabel.className = 'text-sm  font-semibold';
        cityLabel.textContent = 'City';
        cityContainer.appendChild(city);
        cityContainer.className = 'border-b border-white grid grid-cols-1 ';
        cityDiv.appendChild(cityLabel);
        cityDiv.appendChild(cityContainer)

        zipAndCityDiv.appendChild(zipDiv);
        zipAndCityDiv.appendChild(cityDiv);


        addAddressForm.appendChild(addressNicknameDiv);
        addressNickname.required = true;

        addAddressForm.appendChild(streetAddressDiv);
        addAddressForm.appendChild(stateDiv);
        addAddressForm.appendChild(zipAndCityDiv);

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Please fill in all fields correctly';
        submitButton.className = 'bg-white text-custom-red font-semibold py-2 rounded-3xl hover:bg-opacity-90 disabled:bg-[#F36A6B] mt-10';
        submitButton.disabled = true; // Initially disable the button


        const validateAndToggleAdd = () => {
            const isValid = validateAddAddressForm();
            console.log(isValid);
            submitButton.disabled = !isValid; // Disable button if form is invalid
            if (isValid === true) {
                submitButton.textContent = 'Add Address';
            }
        };
        addAddressForm.addEventListener('input', validateAndToggleAdd); // Re-validate on input change

        submitButton.addEventListener('click', () => {
            if (validateAddAddressForm()) {
                // onCheckout();

                const address = {
                    name: document.getElementById('address-nickname').value,
                    address: {
                        userId: currentUser.id,
                        address: document.getElementById('street-address').value,
                        city: document.getElementById('city').value,
                        state: document.getElementById('state').value,
                        postalCode: document.getElementById('zip').value,

                    },

                }
                // currentUser.addresses.push(address);
                // const users=JSON.parse(localStorage.getItem('user'));
                // const userIndex=users.findIndex(user=>user.id===currentUser.id);
                // users[userIndex]=currentUser;
                // localStorage.setItem('currentUser',JSON.stringify(currentUser));
                // localStorage.setItem('user',JSON.stringify(users));

                const addAddressResponse = fetch('/api/addresses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(address.address),
                });


                addAddress = false;
                renderCheckout();
            }

        })
        addAddressForm.appendChild(submitButton);


        return addAddressForm;
    }

    const validateAddAddressForm = () => {
        const addressNickname = document.getElementById('address-nickname').value.trim();
        const streetAddress = document.getElementById('street-address').value.trim();
        const state = document.getElementById('state').value.trim();
        const zip = document.getElementById('zip').value.trim();
        const city = document.getElementById('city').value.trim();

        // Check if any of the fields are empty
        if (!addressNickname || !streetAddress || !state || !zip || !city) {
            return false;
        }

        // Add more specific validation if needed

        return true;
    };


    const renderCardPayment = () => {

        const cardPaymentDiv = document.createElement('div');
// cardPaymentDiv.className='flex flex-col gap-4 text-white mt-16';
        const cardPaymentForm = document.createElement('form');
        cardPaymentForm.className = 'flex flex-col gap-4 text-white mt-16 relative h-full';


        const cardNameContainer = document.createElement('div');
        const cardNameDiv = document.createElement('div');
        cardNameDiv.className = 'flex flex-col gap-1 ';

        const cardNameLabel = document.createElement('label');

        const cardName = document.createElement('input');
        cardName.id = 'cardName';
// cardName.placeholder='Card Name';
        cardName.className = 'input  placeholder-white outline-none  focus:outline-none focus:border-none  ';
        cardNameLabel.className = 'text-sm  ';
        cardNameLabel.textContent = 'Card Name';
        cardNameContainer.appendChild(cardName);
        cardNameContainer.className = 'border-b border-white grid grid-cols-1 ';
        cardNameDiv.appendChild(cardNameLabel);
        cardNameDiv.appendChild(cardNameContainer);


        const cardNumberContainer = document.createElement('div');
        const cardNumberDiv = document.createElement('div');
        cardNumberDiv.className = 'text-sm flex flex-col gap-1 ';

        const cardNumberLabel = document.createElement('label');
        cardNumberLabel.className = 'text-sm';
        cardNumberLabel.textContent = 'Card Number';
        const cardNumber = document.createElement('input');
        cardNumber.id = 'cardNumber';
// cardNumber.placeholder='Card Number';
        cardNumber.className = 'input  placeholder-white outline-none  focus:outline-none focus:border-none ';

        cardNumberDiv.appendChild(cardNumberLabel);
        cardNumberContainer.appendChild(cardNumber);
        cardNumberContainer.className = 'border-b border-white grid grid-cols-1';
        cardNumberDiv.appendChild(cardNumberContainer);


        const cardExpiryContainer = document.createElement('div');
        cardExpiryContainer.className = 'border-b border-white grid grid-cols-1';
        const cardExpiryDiv = document.createElement('div');
        const cardExpiryLabel = document.createElement('label');
        cardExpiryLabel.textContent = 'Card Expiry';
        cardExpiryLabel.className = 'text-sm';


        const cardExpiry = document.createElement('input');
        cardExpiry.id = 'cardExpiry';
// cardExpiry.placeholder='Card Expiry';
        cardExpiry.className = 'input  placeholder-white outline-none  focus:outline-none focus:border-none ';

        cardExpiryContainer.appendChild(cardExpiry);
        cardExpiryDiv.appendChild(cardExpiryLabel);
        cardExpiryDiv.appendChild(cardExpiryContainer);
        cardExpiryDiv.className = 'text-sm flex flex-col gap-1 ';

        const cardCVVDiv = document.createElement('div');
        const cardCVVLabel = document.createElement('label');
        cardCVVLabel.textContent = 'Card CVV';
        cardCVVLabel.className = 'text-sm';

        const cardCvv = document.createElement('input');
        cardCvv.id = 'cardCVV';
// cardCvv.placeholder='Card CVV';
        const cardCVVContainer = document.createElement('div');
        cardCvv.className = 'input  placeholder-white outline-none  focus:outline-none focus:border-none ';

        cardCVVContainer.appendChild(cardCvv);
        cardCVVContainer.className = 'border-b border-white grid grid-cols-1';

        cardCVVDiv.className = 'text-sm flex flex-col gap-1 ';
        cardCVVDiv.appendChild(cardCVVLabel);
        cardCVVDiv.appendChild(cardCVVContainer);


        const cardExpiryAndCVVDiv = document.createElement('div');
        cardExpiryAndCVVDiv.className = 'grid grid-cols-2 gap-4';
        cardExpiryAndCVVDiv.appendChild(cardExpiryDiv);
        cardExpiryAndCVVDiv.appendChild(cardCVVDiv);


        cardPaymentForm.appendChild(cardNameDiv);

        cardPaymentForm.appendChild(cardNumberDiv);
        cardPaymentForm.appendChild(cardExpiryAndCVVDiv);
// cardPaymentForm.appendChild(cardCVVDiv);

// cardPaymentDiv.appendChild(cardPaymentForm);
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Please fill in all fields correctly';
        submitButton.className = 'bg-white text-custom-red font-semibold py-2 rounded-3xl hover:bg-opacity-90 disabled:bg-[#F36A6B] mt-10';
        submitButton.disabled = true; // Initially disable the button


        const validateAndToggleSubmit = () => {
            const isValid = validateCardPaymentForm();
            submitButton.disabled = !isValid; // Disable button if form is invalid
            if (isValid === true) {
                submitButton.textContent = 'Pay';
            }
        };
        cardPaymentForm.addEventListener('input', validateAndToggleSubmit); // Re-validate on input change

        submitButton.addEventListener('click', async () => {
            if (validateCardPaymentForm()) {
                if (await onCheckout()) {
                    window.location.href = '../confirmation.html';
                } else {
                    alert('please add items to your cart')
                }
            }
        })
// cardPaymentForm.appendChild();
        cardPaymentForm.appendChild(submitButton);

        return cardPaymentForm;
    }
    const renderBalancePayment = () => {
        const paymentDiv = document.createElement('div');
        const balanceDiv = document.createElement('div');
        balanceDiv.className = 'flex flex-col  text-white mt-16';
        const balanceLabel = document.createElement('label');
        balanceLabel.textContent = 'Your balance is';
        balanceLabel.className = 'text-xs font-semibold text-white';
        const balance = document.createElement('p');
        balance.textContent = '$' + currentUser.balance;
        balance.className = 'text-3xl font-semibold mt-2 text-white border-b-[.001rem] ';
        balanceDiv.appendChild(balanceLabel);
        balanceDiv.appendChild(balance);
        paymentDiv.appendChild(balanceDiv);


        const submitButton = document.createElement('button');
        submitButton.textContent = validateBalancePayment() ? 'Checkout' : 'Insufficient balance';
        submitButton.className = 'bg-white text-custom-red font-semibold w-full py-2 rounded-3xl hover:bg-opacity-90 disabled:bg-[#F36A6B] mt-10';
        submitButton.disabled = !validateBalancePayment(); // Initially disable the button
        console.log(currentUser.balance);
        console.log(validateBalancePayment());
        paymentDiv.appendChild(submitButton);

        submitButton.addEventListener('click', async () => {
            if (validateBalancePayment()) {
                // console.log('checking out', onCheckout()    )
                if (await onCheckout()) {
                    // console.log('checked out', onCheckout()    )

                    window.location.href = '../confirmation.html';
                } else {
                    // console.log('failed out', onCheckout()    )

                }

            }
        });


        return paymentDiv;

    }

    const validateBalancePayment = () => {
        const balance = currentUser.balance;
        if (balance < cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)) {
            return false;
        }
        return true;
    }

    const validateCardPaymentForm = () => {
        const cardName = document.getElementById('cardName').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardExpiry = document.getElementById('cardExpiry').value.trim();
        const cardCVV = document.getElementById('cardCVV').value.trim();

        if (cardName === '' || cardNumber === '' || cardExpiry === '' || cardCVV === '') {
            // alert('All fields are required');
            return false;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            // alert('Invalid card number. Please enter a 16-digit card number');
            return false;
        }

        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            // alert('Invalid card expiry. Please enter a valid expiry date (MM/YY)');
            return false;
        }

        if (!/^\d{3}$/.test(cardCVV)) {
            // alert('Invalid card CVV. Please enter a 3-digit CVV');
            return false;
        }

        return true;
    };


    const renderPayment = () => {
        const paymentDiv = document.createElement('div');
        const paymentOptionsDiv = document.createElement('div');
        paymentOptionsDiv.className = 'flex gap-4 flex-col mt-5 border-b-2 border-gray-300 pb-4 text-white h-full';
//     // Create a new radio button element
        const radioCardDiv = document.createElement('div');
        const radioCard = document.createElement('input');

//     // Set the type and name attributes
        radioCard.setAttribute('type', 'radio');
        radioCard.setAttribute('name', 'radio-10');
        radioCard.setAttribute('value', 'card');
        // radioCard.selected=true;
        if (paymentMethod === 2) {
            radioCard.setAttribute('checked', true);
        }
        radioCard.className = 'radio checked:bg-white'

        const radioCardLabel = document.createElement('label');
        radioCardLabel.textContent = 'Pay with Card';
        radioCardLabel.className = 'text-lg font-semibold'
        radioCardDiv.appendChild(radioCard);
        radioCardDiv.appendChild(radioCardLabel);
        radioCardDiv.className = 'flex gap-4 items-center'
        // radioCard.classList.add('radio')

        const radioBalanceDiv = document.createElement('div');

        const radioBalance = document.createElement('input');
        // Set the type and name attributes
        radioBalance.setAttribute('type', 'radio');
        radioBalance.setAttribute('name', 'radio-10');
        radioBalance.setAttribute('value', 'balance');
        if (paymentMethod === 1) {
            radioBalance.setAttribute('checked', true);
        }
        radioBalance.className = 'radio checked:bg-white'
        const radioBalanceLabel = document.createElement('label');
        radioBalanceLabel.textContent = 'Pay with Balance';
        radioBalanceLabel.className = 'text-lg font-semibold'
        radioBalanceDiv.appendChild(radioBalance);
        radioBalanceDiv.appendChild(radioBalanceLabel);
        radioBalanceDiv.className = 'flex gap-4 items-center'

        paymentOptionsDiv.appendChild(radioCardDiv);
        paymentOptionsDiv.appendChild(radioBalanceDiv);
        paymentDiv.appendChild(paymentOptionsDiv);
        const paymentDetailsDiv = document.createElement('div');
        paymentDiv.appendChild(paymentDetailsDiv);
        paymentDetailsDiv.className = 'h-full'

        if (checkoutStepNumber === 2) {
            switch (paymentMethod) {
                case 1:
                    paymentDetailsDiv.appendChild(renderBalancePayment());
                    break;
                case 2:
                    paymentDetailsDiv.appendChild(renderCardPayment());
                    break;

            }


        }
        paymentDiv.addEventListener('change', (event) => {
            if (event.target.tagName === 'INPUT' && event.target.type === 'radio') {
                if (event.target.value === 'card') {
                    paymentDetailsDiv.replaceChildren();
                    paymentDetailsDiv.className = 'h-full'
                    paymentMethod = 2;

                    paymentDetailsDiv.appendChild(renderCardPayment());
                    console.log('Card payment selected');
                } else if (event.target.value === 'balance') {
                    paymentDetailsDiv.replaceChildren();
                    paymentDetailsDiv.appendChild(renderBalancePayment());
                    paymentMethod = 1;
                    // Render balance payment method
                    console.log('Balance payment selected');
                }
            }
        });


        return paymentDiv;


    }


    const renderCheckout = () => {
        const checkoutStepNo = document.querySelector('#checkout-step-no');
        checkoutStepNo.textContent = checkoutStepNumber;

        const checkoutStep = document.querySelector('#checkout-step');
        checkoutStep.replaceChildren();

        checkoutStep.className = 'text-2xl font-semibold text-white mt-4 border-b-2 border-gray-300 pb-6';

        const checkoutDiv = document.querySelector('#checkout-div');
        checkoutDiv.className = 'h-full'
        checkoutDiv.replaceChildren();
        switch (checkoutStepNumber) {
            case 1:
                checkoutStep.textContent = 'Shipping Info'
                checkoutDiv.appendChild(renderShippingInfo());
                break;
            case 2:
                checkoutStep.textContent = 'Payment Info'
                checkoutDiv.appendChild(renderPayment());
                break;

        }
        const backButton = document.createElement('img');
        backButton.src = '/media/back-btn.svg';
        backButton.className = 'h-16 w-16 my-auto mx-auto cursor-pointer hover:scale-105 absolute top-0 right-0 mb-4 ml-4 px-4 py-2'

        backButton.addEventListener('click', () => {
            if (checkoutStepNumber === 2) {
                checkoutStepNumber -= 1;
            } else if (addAddress) {
                addAddress = false;

            }

            renderCheckout();

        })
        console.log(addAddress)
        if (checkoutStepNumber === 2 || addAddress) {
            checkoutDiv.appendChild(backButton);
            // checkoutDiv.appendChild(backButton);
            // addAddress=false;
        }

    }

    async function updateStock(product, quantity) {
        const newStock = product.stock - quantity;
        console.log(newStock)
        console.log(product.id)

        const response = await fetch(`/api/products/${product.id}`, {
            method: "PATCH",
            body: JSON.stringify({stock: newStock}),
        });
        console.log(response)

    }


    async function onCheckout() {
        console.log('checking out', cartItems.length)
        if (cartItems.length === 0) {
            alert('please add items to your cart')

            return false;
        }


        let InsufficientStock = false;
        for (const cartItem of cartItems) {
            const product = products.find(p => p.id === cartItem.product.id);
            if (product && product.stock >= cartItem.quantity) {
                // product.stock -= cartItem.quantity;
                await updateStock(product, cartItem.quantity);
            } else {
                console.log(`Not enough quantity for product with ID ${cartItem.product.id}`);

                InsufficientStock = true;
                continue;

            }
        }
        if (InsufficientStock) {
            alert(`Not enough quantity for one of the products selected`);

            return false;
        }

        // localStorage.setItem('products', JSON.stringify(products)); //todo
        const purchaseDeals = [];
        // let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];

        const purchase = {
            total_price: parseFloat(cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)),
            timeStamp: new Date().toString(),
        }

        const groupedItems = Object.groupBy(cartItems, (item) => item.product.sellerId);
        console.log(groupedItems)
        // [],"id"
        for (const [id, items] of Object.entries(groupedItems)) {
            console.log(items, id)
            const deal = {
                sellerId: id, // Assuming product.user is the seller object
                customerId: currentUser.id,
                cartItems: items.map(item => item.id),
            };
            const response = await fetch(`/api/deal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...deal,
                }),
            });

            purchaseDeals.push(await response.json());
        }
        console.log(purchaseDeals)
        console.log(purchase)
        const addedPurchase = await fetch(`/api/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...purchase,
                deals: purchaseDeals.map(deal => deal.id)
            }),
        });
        console.log(cartItems)
        for (let item in cartItems) {
            const deleteResponse = await fetch(`/api/cartitems/${item.id}`, {
                method: 'DELETE',
            });
        }

        // purchaseDeals.forEach(deal => {
        //
        // })


        // purchasedItems.push(purchase);
        // localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
        // localStorage.setItem('cart', JSON.stringify([]));
        if (paymentMethod === 1) {
            currentUser.balance -= purchase.totalPrice;
            // localStorage.setItem('currentUser', JSON.stringify(currentUser));
            // const users = JSON.parse(localStorage.getItem('user'));
            // users.find(user => user.id === currentUser.id).balance = currentUser.balance;
            // localStorage.setItem('user', JSON.stringify(users));
        }
        return true;

    }


    renderCheckout();


    renderCartItems()

    async function addToCart(product, quantity = 1) {

        const isLoggedIn = localStorage.getItem('currentUser') !== "-1";
        if (isLoggedIn) {
            let carItems = []
            const response = await fetch(`/api/cartitems`).then(res => res.json()).then(data => carItems = data);
            carItems = carItems.filter(item => item.customer === currentUser.id);
            let inCart = carItems.find(item => item.product.id === product.id);
            if (!inCart) {
                const cartItem = {
                    productId: product.id,
                    quantity: quantity,
                    customer: currentUser.id
                }
                const addCartItemResponse = await fetch(`/api/cartitems`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...cartItem})
                })
            } else {
                console.log(inCart.quantity, inCart.product.stock)
                if (inCart.quantity < inCart.product.stock) {
                    inCart.quantity += quantity; //todo change in api
                    const updateCartItemResponse = await fetch(`/api/cartitems/${inCart.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({quantity: inCart})
                    })
                } else {
                    showToast('Your reached max stock', 'bg-red-200');
                }
            }

        } else {
            let cartItemsLs = JSON.parse(localStorage.getItem('cart')) || [];
            const allProductsResponse = fetch(`/api/products`).then(res => res.json()).then(data => {
                cartItemsLs = cartItemsLs.map(item => {
                    item.product = data.find(product => product.id === item.product.id);
                    return item;
                })
            });
            const mainProduct = products.find(prod => prod.id === product.id);
            let inCart = cartItemsLs.find(item => item.product === product.id);
            if (!inCart) {
                const cartItem = {
                    product: product.id,
                    quantity: 1
                }
                cartItemsLs.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cartItemsLs));
                showToast('Product added to cart', 'bg-green-200');
            } else if (inCart.quantity < mainProduct.stock) {

                inCart.quantity += quantity;

                showToast('Product added to cart', 'bg-green-200');

            } else {
                showToast('Your reached max stock', 'bg-red-200');

            }
            localStorage.setItem('cart', JSON.stringify(cartItemsLs));

        }

    }


})