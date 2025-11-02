import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const DoctorReview = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Dr. Ruby is an amazing doctor! Very professional and kind.",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "Great experience, but the wait time was a bit long.",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating > 0 && newReview.comment) {
      setReviews([...reviews, { ...newReview, id: reviews.length + 1, avatar: `https://i.pravatar.cc/150?img=${reviews.length + 5}` }]);
      setNewReview({ name: "", rating: 0, comment: "" });
    }
  };

  return (
    <section className="pb-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
       
        {/* Review Form */}
        <div className="mb-6  ">
          <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name Input */}
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              required
            />

            {/* Star Rating */}
            <div className="flex gap-1">
            <Rating style={{ maxWidth: 150 }} value={4} readOnly />
            </div>

            {/* Comment Box */}
            <textarea
              placeholder="Write your review..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
            ></textarea>

            {/* Submit Button */}
            <button className="w-full bg-[#F7A582] text-white py-2 rounded-lg hover:bg-[#ec8457]">Submit Review</button>
          </form>
        </div>

        {/* Reviews List */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Patient Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="border-b py-4 flex gap-4 items-start">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} size={16} />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorReview;
