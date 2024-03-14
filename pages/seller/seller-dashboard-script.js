document.addEventListener("DOMContentLoaded", () => {
  const comments = [
    {
      name: "suiiiiii",
      comment: "very nice, matches description",
      product: "product object",
    },
    {
      name: "mohaned ahmed",
      comment: "very nice, matches description",
      product: "product object",
    },
    {
      name: "mohaned ahmed",
      comment: "very nice, matches description",
      product: "product object",
    },
    {
      name: "mohaned ahmed",
      comment: "very nice, matches description",
      product: "product object",
    },
  ];
  const currentUser=JSON.parse(localStorage.getItem("currentUser"));
  const select = document.getElementById("sellerNav");
  console.log(currentUser.firstName)
    select.setAttribute("name",currentUser.firstName)

  const renderComment = (comment) => {

    const commentDiv = document.createElement("div");
    commentDiv.classList.add(
      "flex",
      "pb-8",
      "border-b-2",
      "border-gray-300",
      "mt-4"
    );

    const imgDiv = document.createElement("div");
    const commentImg = document.createElement("img");
    commentImg.src = "../../media/grey-cart.svg";

    imgDiv.appendChild(commentImg);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("mt-4", "ms-3");

    const name = document.createElement("h3");
    name.classList.add("text-2xl", "font-bold");
    name.textContent = comment.name;

    const product = document.createElement("p");
    product.classList.add("text-sm");
    product.textContent = comment.product;

    const commentP = document.createElement("p");
    commentP.classList.add("mt-3");
    commentP.textContent = comment.comment;

    infoDiv.appendChild(name);
    infoDiv.appendChild(product);
    infoDiv.appendChild(commentP);
    
    commentDiv.appendChild(imgDiv);
    commentDiv.appendChild(infoDiv);

    return commentDiv;
  };

  const renderComments = () => {

    const commentsDiv = document.querySelector("#latest-comments");

    let displayComments=[]
    for (let i = 0; i < 3; i++) {
      displayComments.push(comments[i]);
    }

    displayComments.forEach((comment) =>
      commentsDiv.appendChild(renderComment(comment))
    );
  };

  const rednderTotalSales = () => {
    const totalSalesDiv = document.querySelector("#total-sales-div");

    const totalSales = document.createElement("h3");
    totalSales.classList.add("text-5xl", "font-bold", "ms-3");
    totalSales.textContent = 1000;

    totalSalesDiv.appendChild(totalSales);
    
  };

  const totalCustomers=() =>{

    const totalCustomersDiv = document.querySelector("#total-customers-div");

    const totalCustomers=document.createElement("h3");
    totalCustomers.classList.add("text-5xl", "font-bold", "ms-3");
    totalCustomers.textContent=105;

    totalCustomersDiv.appendChild(totalCustomers);

  }





  renderComments();
  rednderTotalSales();
  totalCustomers();
});
