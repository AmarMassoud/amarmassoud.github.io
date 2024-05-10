import React from "react";

function RefundRequest({ refundRequest, products }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const commentProduct = products.find(
        (product) => product.id === comment.productId
      );
      setProduct(commentProduct);
    }
  }, [products, comment.productId]);

  return (
    <div className="grid grid-cols-4 gap-2 pb-4 border-b-2 border-gray-300 mt-4 h-52">
      <div className="col-span-1">
        <img src="../../media/grey-cart.svg" alt="User Avatar" />
      </div>
      <div className="col-span-3 mt-4 ms-3">
        <h3 className="text-xl font-semibold">
          {refundRequest.user.firstName} {refundRequest.user.lastName}
        </h3>
        <p className="text-sm">{product ? product.title : ""}</p>
        <p className="mt-3">{refundRequest.body}</p>
        <button
          className="text-bs font-semibold text-black-500 bg-white py-2 px-10 rounded-xl hover:text-white hover:bg-custom-red mt-5 text-nowrap"
          onClick=""
        >
          More Details
        </button>
      </div>
    </div>
  );
}

export default RefundRequest;
