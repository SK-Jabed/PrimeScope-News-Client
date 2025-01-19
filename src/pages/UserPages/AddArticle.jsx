import React from "react";
import { Helmet } from "react-helmet-async";
import AddArticleForm from "../../components/Forms/AddArticleForm";

const AddArticle = () => {
  return (
    <div>
      <Helmet>
        <title>Add Article | PrimeScope News</title>
      </Helmet>

      {/* Form */}
      <AddArticleForm />
    </div>
  );
};

export default AddArticle;
