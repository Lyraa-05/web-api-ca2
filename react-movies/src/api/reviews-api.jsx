// const API_URL = "http://localhost:8080/api/reviews";

// export const getMyReviews = (token) => {
//   return fetch(API_URL, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(res => res.json());
// };

// export const addReview = (review, token) => {
//   return fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(review),
//   }).then(res => res.json());
// };

// export const deleteReview = (id, token) => {
//   return fetch(`${API_URL}/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };