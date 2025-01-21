import { axiosSecure } from "../../../hooks/useAxiosSecure";

const AdminArticlesTable = ({ articles, refetch, onOpenDeclineModal }) => {
  const handleApprove = async (id) => {
    // Call API to approve the article
    // await axiosSecure.put(`/articles/${id}/approve`);
    await axiosSecure.patch(`/articles/approve/${id}`);
    refetch();
  };

  const handleDelete = async (id) => {
    // Call API to delete the article
    await axiosSecure.delete(`/articles/${id}`);
    refetch();
  };

  const handleMakePremium = async (id) => {
    // Call API to make the article premium
    // await axiosSecure.put(`/articles/${id}/make-premium`);
    await axiosSecure.patch(`/articles/premium/${id}`);
    refetch();
  };

  return (
    <table className="table-auto w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th>Title</th>
          <th>Author</th>
          {/* <th>Publisher</th> */}
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article._id} className="border-b">
            <td>{article.title}</td>
            <td>{article.author.name}</td>
            {/* <td>{article.publisher}</td> */}
            <td>{article.status}</td>
            <td>
              <button
                className="btn btn-success mr-2"
                onClick={() => handleApprove(article._id)}
              >
                Approve
              </button>
              <button
                className="btn btn-warning mr-2"
                onClick={() => onOpenDeclineModal(article._id)}
              >
                Decline
              </button>
              <button
                className="btn btn-danger mr-2"
                onClick={() => handleDelete(article._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-info"
                onClick={() => handleMakePremium(article._id)}
              >
                Make Premium
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminArticlesTable;
