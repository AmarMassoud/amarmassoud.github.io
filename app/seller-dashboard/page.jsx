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

  const [userName, setName] = useState(null);
  const [currentUserID, setCurrentUserID] = useState(null);

  const projectTitle = useRef();
  const [stale, setStale] = useState(true);

  // useEffect(() => {
  //   const currentUserId = localStorage.getItem("currentUserId") ||7;
  //   console.log(currentUserId);
  //   if (stale) {
  //     localStorage.getItem("currentUserId")
  //         .then((res) => res.json())
  //         .then((data) => {
  //           const shortData = data.slice(0, 3);
  //           setComments(shortData);
  //         })
  //         .catch(() => {})
  //         .finally(() => {});
  //     setStale(false);
  //   }
  //
  //   return () => {};
  // }, [stale]); // empty dependency array to run only once on component mount
  //


  useEffect(() => {
    const currentUserId = localStorage.getItem("currentUserId") ||7;
    console.log(currentUserId);
    if (stale) {
      fetch(`/api/comments/seller/${currentUserId}`)
          .then((res) => res.json())
          .then((data) => {
            const shortData = data.slice(0, 3);
            setComments(shortData);
          })
          .catch(() => {})
          .finally(() => {});
      setStale(false);
    }

    return () => {};
  }, [stale]); // empty dependency array to run only once on component mount

  useEffect(() => {
    const currentUserId = localStorage.getItem("currentUserId") ||7;
    console.log(currentUserId);
    if (stale) {
      fetch(`/api/user/${currentUserId}`)
          .then((res) => res.json())
          .then((data) => {
            setName(data.firstName);
          })
          .catch(() => {})
          .finally(() => {});
      setStale(false);
    }

    return () => {};
  }, []);
  console.log(userName);




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
      <SellerNav name={userName}></SellerNav>
      <main className="grid grid-cols-4 gap-16 font-inter px-8 mt-8 -lg:flex -lg:flex-col">
        <script type="module" src="../../public/scripts/footer.js"></script>

        <section id="analytics" className="col-span-3 center">
          <SalesSummary currentUserID={2}></SalesSummary>
          <SalesChart />
          <Education />
        </section>
        <section
          id="interactions"
          className="w-full -lg:grid -lg:grid-cols-2 -lg:gap-8"
        >
          <div className="bg-custom-gray rounded-3xl p-4 h-fit">
            <p className="text-2xl font-bold ms-1 mt-2">Latest comments</p>
            <div className="p-2" id="latest-comments">
              {comments.map((comment) => (
                <Comments
                  key={comment.id}
                  comment={comment}
                />
              ))}
            </div>
          </div>

          <div className="bg-custom-gray rounded-3xl p-4 h-fit mt-8 w-full -lg:mt-0">
            <p className="text-2xl font-bold ms-1 mt-2">Refund Requests</p>
            <div className="p-2 w-full" id="refund-requests">
              {requests.length != 0 ? (
                requests.map((request) => (
                  <RefundRequest key={request.id} request={request} />
                ))
              ) : (
                <div className="text-center text-lg mt-4 h-96">
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
