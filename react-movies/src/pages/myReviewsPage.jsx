const MyReviewsPage = () => {
  const { token } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: () => getMyReviews(token),
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <h2>My Reviews</h2>
      {data.map(r => (
        <p key={r._id}>
          Movie ID: {r.movieId} — Rating: {r.rating}
        </p>
      ))}
    </>
  );
};
