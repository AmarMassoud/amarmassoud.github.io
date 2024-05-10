"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import SalesSummary from "@/components/salesSummary";
import SalesChart from "@/components/salesChart";
import Education from "@/components/education";
import Comments from "@/components/comment";
import RefundRequest from "@/components/request";
import Footer from "@/components/footer";
import SellerNav from "@/components/sellerNav";
export default function SellerDashboard() {
  const [comments, setComments] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const commentsData = localStorage.getItem("comments");
      // const comments = commentsData.slice(0, 3);
      // setComments(comments);
      if (!commentsData) {
        const response = await fetch("../../public/data/comments.json");

        if (response.ok) {
          const responseData = await response.json();
          if (Array.isArray(responseData)) {
            localStorage.setItem("comments", JSON.stringify(responseData));
          } else {
            console.error("Invalid comments data format:", responseData);
          }
        } else {
          console.error("Failed to fetch comments data");
        }
      } else {
        const comments = JSON.parse(commentsData).slice(0, 3);

        setComments(comments);
      }
    };

    getComments();
  }, []); // empty dependency array to run only once on component mount

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = localStorage.getItem("products");

      if (!productsData) {
        const response = await fetch("../public/data/products.json");

        if (response.ok) {
          const responseData = await response.json();
          if (Array.isArray(responseData)) {
            localStorage.setItem("products", JSON.stringify(responseData));
            setProducts(responseData);
          } else {
            console.error("Invalid products data format:", responseData);
          }
        } else {
          console.error("Failed to fetch products data");
        }
      } else {
        setProducts(JSON.parse(productsData));
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getRequests = async () => {
      const refundRequests =
        JSON.parse(localStorage.getItem("refundRequests")) || [];
      setRequests(refundRequests);
    };

    getRequests();
  }, []);
  return (
    <main>
      <SellerNav name={"Mohanad"}></SellerNav>
      <main class="grid grid-cols-4 gap-16 font-inter px-8 mt-8 -lg:flex -lg:flex-col">
        <script type="module" src="../../public/scripts/footer.js"></script>

        <section id="analytics" class="col-span-3 center">
          <SalesSummary />
          <SalesChart />
          <Education />
        </section>
        <section
          id="interactions"
          class="w-full -lg:grid -lg:grid-cols-2 -lg:gap-8"
        >
          <div class="bg-custom-gray rounded-3xl p-4 h-fit">
            <p class="text-2xl font-bold ms-1 mt-2">Latest comments</p>
            <div class="p-2" id="latest-comments">
              {comments.map((comment) => (
                <Comments
                  key={comment.id}
                  comment={comment}
                  products={products}
                />
              ))}
            </div>
          </div>

          <div class="bg-custom-gray rounded-3xl p-4 h-fit mt-8 w-full -lg:mt-0">
            <p class="text-2xl font-bold ms-1 mt-2">Refund Requests</p>
            <div class="p-2 w-full" id="refund-requests">
              {requests.length != 0 ? (
                requests.map((request) => (
                  <RefundRequest key={request.id} request={request} />
                ))
              ) : (
                <div class="text-center text-lg mt-4 h-96">
                  No refund requests
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </main>
  );
}
