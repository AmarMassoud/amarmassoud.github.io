document.addEventListener("DOMContentLoaded", async() => {

let cartItems= JSON.parse(localStorage.getItem('cart')) || [];
let currentUser= JSON.parse(localStorage.getItem('currentUser')) || {};
const select = document.getElementById("nav");
console.log(currentUser.firstName)
select.setAttribute("name",currentUser.firstName)
let checkoutStepNumber=1;
let selectedAddress=null;

const renderCartItem= (cartItem)=>{
    // let desiredQuantity=1;

    const itemDiv= document.createElement('div');
    itemDiv.className='grid grid-cols-10  border-b-2  border-gray-300 py-5 ';
    const productInStock=cartItem.product.stock>1;


    const productDetailsDiv=document.createElement('div');
    productDetailsDiv.className='col-start-1 col-end-6 flex gap-10  items-center wrap '
    const productName=document.createElement('p');
    productName.textContent=cartItem.product.title
    productName.className='text-lg font-semibold';
    const productImg=document.createElement('img');
    productImg.src=cartItem.product.thumbnail;
    productImg.className='max-h-28 max-w-28 rounded-lg bg-custom-gray p-1';
    
    productDetailsDiv.appendChild(productImg);
    productDetailsDiv.appendChild(productName);

    // const quantity
    const quantityDiv=document.createElement("div");
    quantityDiv.className="flex flex-col space-y-0 col-span-2 items-center justify-center"
    const quantity=document.createElement("p");
    // quantity.textContent=currentProduct.textContent=currentProduct.stock +" items left";
    quantity.textContent="Availability:";
    quantity.className=" text-xl "

    // quantityDiv.appendChild(quantity);
    const containerDiv = document.createElement('div');
    containerDiv.className = 'custom-number-input h-10 w-32 ';
    
    

    const flexDiv = document.createElement('div');
    flexDiv.className = 'flex flex-row   h-10 w-fit rounded-lg relative bg-custom-gray  border '+ (productInStock?"":"opacity-50");


    const decrementButton = document.createElement('button');
    decrementButton.className =  `${(productInStock?`hover:bg-zinc-300`:`hover:cursor-default`)} h-full w-10 rounded-l `;
    decrementButton.innerHTML = `<span class="m-auto text-2xl  font-thin text-gray-600  ${(productInStock?`hover:text-black `:``)}">-</span>`;
    
    const input = document.createElement('input');
    input.type = 'counter';
    input.readOnly = true;
    input.className = ' outline-none text-center w-10 bg-white font-semibold text-md  focus:text-black md:text-base cursor-default flex items-center text-gray-700';
    input.value = (productInStock?cartItem.quantity:"X");
    
    const incrementButton = document.createElement('button');
    incrementButton.className =  `${(productInStock?`hover:bg-zinc-300`:`hover:cursor-default`)} h-full w-10 rounded-l `;
    incrementButton.innerHTML = `<span class="m-auto text-2xl  font-thin text-gray-600  ${(productInStock?`hover:text-black`:``)}">+</span>`;
    decrementButton.addEventListener("click",()=>{
        if(cartItem.quantity>1)
        cartItems.find(item=>item.product.id===cartItem.product.id).quantity-=1;
        localStorage.setItem('cart',JSON.stringify(cartItems));

        renderCartItems()

        }
        );
        incrementButton.addEventListener("click",()=>{
            if(cartItem.quantity<cartItem.product.stock)
            cartItems.find(item=>item.product.id===cartItem.product.id).quantity+=1;
        localStorage.setItem('cart',JSON.stringify(cartItems));
        renderCartItems()
            })
        
        //   incrementQuantity(desiredQuantity, cartItem.product.stock)  
        


    flexDiv.appendChild(decrementButton);
    flexDiv.appendChild(input);
    flexDiv.appendChild(incrementButton);
    
    // containerDiv.appendChild(inStock);
    containerDiv.appendChild(flexDiv);
    
    quantityDiv.appendChild(containerDiv);


    const totalPrice= document.createElement('p');
    totalPrice.textContent='$' + cartItem.product.price*cartItem.quantity;
    totalPrice.className="text-lg font-semibold col-span-2 text-center m-auto "
    const removeButton=document.createElement('img');
    removeButton.src="/media/deleteXIcon.svg";
    removeButton.className="h-5 w-5 cursor-pointer  m-auto hover:scale-110"

    itemDiv.appendChild(productDetailsDiv);
    itemDiv.appendChild(quantityDiv);
    itemDiv.appendChild(totalPrice);
    itemDiv.appendChild(removeButton)

    removeButton.addEventListener('click',()=>{
        cartItems=cartItems.filter(item=>item.product.id!==cartItem.product.id);
        localStorage.setItem('cart',JSON.stringify(cartItems));
        renderCartItems()


    })

return itemDiv;
}

const cartTotal=()=>{
    const cartItems= JSON.parse(localStorage.getItem('cart'));
    const totalDiv=document.querySelector('#cart-total');
    const total=cartItems.reduce((acc,item)=>acc+item.product.price*item.quantity,0);
    totalDiv.textContent='$'+total;
    
}

const renderCartItems=()=>{

    const cartItems= JSON.parse(localStorage.getItem('cart'));
    const CartItemsDiv=document.querySelector('#cart-items');
    CartItemsDiv.replaceChildren();
    cartItems.forEach(cartItem=>{
        CartItemsDiv.appendChild(renderCartItem(cartItem));
    })
    cartTotal()
}


const renderShippingAddress=(address)=>{
const shippingAddressDiv=document.createElement('div');
shippingAddressDiv.className='flex gap-8 border-b-[.01rem] border-gray-100 pb-4 text-white pt-4 mx-1 hover:scale-105 cursor-pointer';
const addressImg=document.createElement('img');
addressImg.src='/media/address-icon.svg'
addressImg.className='h-10 w-10 my-auto'

const addressInfo=document.createElement('div');
const addressTitle=document.createElement('p');
addressTitle.className="text-xl font-bold";
addressTitle.textContent=address.name

const addressCity=document.createElement('p');
addressCity.textContent=address.address.city;
const addressStreet=document.createElement('p');
addressStreet.textContent=address.address.address;


addressInfo.appendChild(addressTitle);
addressInfo.appendChild(addressCity);
addressInfo.appendChild(addressStreet);

shippingAddressDiv.appendChild(addressImg);
shippingAddressDiv.appendChild(addressInfo);

shippingAddressDiv.addEventListener('click',()=>{
    selectedAddress=address;
   checkoutStepNumber=2; 
    renderCheckout();
})

return shippingAddressDiv;
}

const renderShippingInfo=()=>{
    let shippingAddresses= currentUser.addresses || [];
    console.log(currentUser)
    console.log(shippingAddresses)
const shippingInfoDiv=document.createElement('div');
// shippingInfoDiv.className='relative h-full'

if(shippingAddresses.length!==0){
    
shippingAddresses.forEach(address=>{
    shippingInfoDiv.appendChild(renderShippingAddress(address));
})}else{
    const noAddresses=document.createElement('p');
    noAddresses.textContent="you don't have any saved addresses, please add one to continue";
    noAddresses.className="text-xl font-bold text-center mx-auto mt-20 my-auto text-white text-opacity-75";
    // shippingInfoDiv.className='h-full'
    shippingInfoDiv.appendChild(noAddresses);

}

const addAddressButton=document.createElement('img');
addAddressButton.src='/media/add-address-btn.svg';
addAddressButton.className='h-20 w-20 my-auto mx-auto cursor-pointer hover:scale-105 absolute bottom-0 right-0 mb-4 ml-4 px-4 py-2'

shippingInfoDiv.appendChild(addAddressButton);

return shippingInfoDiv;

}


const renderCheckout=()=>{
const checkoutStepNo= document.querySelector('#checkout-step-no');
checkoutStepNo.textContent=checkoutStepNumber;

const checkoutStep= document.querySelector('#checkout-step');
checkoutStep.replaceChildren();

checkoutStep.className='text-2xl font-semibold text-white mt-4 border-b-2 border-gray-300 pb-6';

const checkoutDiv=document.querySelector('#checkout-div');
checkoutDiv.replaceChildren();
switch (checkoutStepNumber){
    case 1:
        checkoutStep.textContent='Shipping Info'
        checkoutDiv.appendChild(renderShippingInfo());
        break;
    case 2:
        checkoutStep.textContent='Payment Info'
        break;
 
}
const backButton=document.createElement('img');
backButton.src='/media/back-btn.svg';
backButton.className='h-16 w-16 my-auto mx-auto cursor-pointer hover:scale-105 absolute top-0 right-0 mb-4 ml-4 px-4 py-2'

backButton.addEventListener('click',()=>{
checkoutStepNumber-=1;
renderCheckout();

})

if(checkoutStepNumber===2){
    checkoutDiv.appendChild(backButton);
}

}

renderCheckout();












renderCartItems()



})