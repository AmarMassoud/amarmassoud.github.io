document.addEventListener('DOMContentLoaded', async() => {

// Create button element
const button = document.createElement('button');
button.classList.add('order');

// Create span elements
const spanDefault = document.createElement('span');
spanDefault.classList.add('default');
spanDefault.textContent = 'Complete Order';

const spanSuccess = document.createElement('span');
spanSuccess.classList.add('success');
spanSuccess.textContent = 'Order Placed';

const svg = document.createElement('svg');
svg.setAttribute('viewBox', '0 0 12 10');

const polyline = document.createElement('polyline');
polyline.setAttribute('points', '1.5 6 4.5 9 10.5 1');
svg.appendChild(polyline);
spanSuccess.appendChild(svg);

// Create div elements
const divBox = document.createElement('div');
divBox.classList.add('box');

const divTruck = document.createElement('div');
divTruck.classList.add('truck');

const divBack = document.createElement('div');
divBack.classList.add('back');
divTruck.appendChild(divBack);

const divFront = document.createElement('div');
divFront.classList.add('front');

const divWindow = document.createElement('div');
divWindow.classList.add('window');
divFront.appendChild(divWindow);

const divLightTop = document.createElement('div');
divLightTop.classList.add('light', 'top');
divTruck.appendChild(divLightTop);

const divLightBottom = document.createElement('div');
divLightBottom.classList.add('light', 'bottom');
divTruck.appendChild(divLightBottom);

const divLines = document.createElement('div');
divLines.classList.add('lines');

// Append elements to button
button.appendChild(spanDefault);
button.appendChild(spanSuccess);
button.appendChild(divBox);
button.appendChild(divTruck);
button.appendChild(divLines);

// Append button to document body
document.body.appendChild(button);

// Create dribbble link element
const dribbbleLink = document.createElement('a');
dribbbleLink.classList.add('dribbble');
dribbbleLink.setAttribute('href', 'https://dribbble.com/shots/7112021-Order-confirm-animation');
dribbbleLink.setAttribute('target', '_blank');

const dribbbleImg = document.createElement('img');
dribbbleImg.setAttribute('src', 'https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg');
dribbbleImg.setAttribute('alt', 'Dribbble');

dribbbleLink.appendChild(dribbbleImg);

// Append dribbble link to document body
document.body.appendChild(dribbbleLink);

// Add click event listener to button
button.addEventListener('click', function() {
    if (!button.classList.contains('animate')) {
        button.classList.add('animate');
        setTimeout(() => {
            button.classList.remove('animate');
        }, 10000);
    }
});



})