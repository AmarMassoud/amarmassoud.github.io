import { useState, useEffect } from "react";

export default function Comments({ comment, products }) {
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
    <div className="flex pb-8 border-b-2 border-gray-300 mt-4 h-52">
      <div>
        <img src="../../media/grey-cart.svg" alt="User Avatar" />
      </div>
      <div className="mt-4 ms-3">
        <h3 className="text-xl font-bold no-wrap">
          {comment.user.firstName + " " + comment.user.lastName}
        </h3>
        <p className="text-sm">{product ? product.title : ""}</p>
        <p className="mt-3">{comment.body}</p>
      </div>
    </div>
  );
}
