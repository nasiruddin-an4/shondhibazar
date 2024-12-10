"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity" />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        {/* Modal Content */}
        <div
          className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all 
          animate-in fade-in-0 zoom-in-95 duration-300
          dark:bg-gray-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <span className="sr-only">Close</span>
              <X size={20} />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-gray-700 -mx-6 mb-4" />

          {/* Content */}
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
};

// Review Form Component
const ReviewForm = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }
    onSubmit({ rating, comment });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <span
              className={`text-2xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          </button>
        ))}
      </div>
      <textarea
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full h-32 p-3 border rounded-lg"
        required
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

// Reply Form Component
const ReplyForm = ({ onSubmit, onClose }) => {
  const [reply, setReply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reply.trim()) {
      alert("Please write a reply");
      return;
    }
    onSubmit({ reply });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="Write your reply here..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-full h-24 p-3 border rounded-lg"
        required
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          Submit Reply
        </button>
      </div>
    </form>
  );
};

const Reviews = ({ reviews: initialReviews }) => {
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [reviews, setReviews] = useState(initialReviews);

  const handleReviewSubmit = (reviewData) => {
    const newReview = {
      id: reviews.length + 1,
      name: "Anonymous User", // In real app, get from user context
      rating: reviewData.rating,
      date: new Date().toLocaleDateString(),
      comment: reviewData.comment,
      verified: true,
    };
    setReviews([newReview, ...reviews]);
  };

  const handleReplySubmit = (replyData, reviewId) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            replies: [
              ...(review.replies || []),
              {
                id: Date.now(),
                text: replyData.reply,
                date: new Date().toLocaleDateString(),
                author: "Anonymous User", // In real app, get from user context
              },
            ],
          };
        }
        return review;
      })
    );
  };

  return (
    <>
      {/* Write Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title="Write a Review"
      >
        <ReviewForm
          onSubmit={handleReviewSubmit}
          onClose={() => setReviewModalOpen(false)}
        />
      </Modal>

      {/* Reply Modal */}
      <Modal
        isOpen={activeReplyId !== null}
        onClose={() => setActiveReplyId(null)}
        title="Reply to Review"
      >
        <ReplyForm
          onSubmit={(data) => handleReplySubmit(data, activeReplyId)}
          onClose={() => setActiveReplyId(null)}
        />
      </Modal>

      {/* Reviews Content (keeping your original design) */}
      <div className="space-y-12">
        {/* Reviews Summary Card */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8">
            <div className="text-center md:border-r md:pr-8 md:w-48">
              <div className="text-6xl font-bold text-gray-800 mb-2">4.7</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-2xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium">
                Based on {reviews.length} verified reviews
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 w-full max-w-md">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter((r) => r.rating === rating).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={rating} className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 w-20">
                      <span className="font-medium">{rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-16 text-sm text-gray-500 text-right">
                      {Math.round(percentage)}%
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="md:border-l md:pl-8">
              <button
                onClick={() => setReviewModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
              {/* Keep your original review content structure */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-600">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-gray-600">{review.comment}</p>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <button
                  onClick={() => setActiveReplyId(review.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Reply
                </button>
              </div>

              {/* Display replies */}
              {review.replies && review.replies.length > 0 && (
                <div className="mt-4 pl-6 border-l-2 space-y-4">
                  {review.replies.map((reply) => (
                    <div key={reply.id} className="text-sm text-gray-600">
                      <div className="font-medium">{reply.author}</div>
                      <div className="text-gray-400 text-xs">{reply.date}</div>
                      <div className="mt-1">{reply.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
