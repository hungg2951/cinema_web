import { lazy } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
const NewsDetailComponent = lazy(() => import( "../../../components/client/NewsDetailComponent"));


const NewsDetail = () => {
  const { slug } = useParams();
  const { posts } = useAppSelector((state: any) => state.PostReducer);
  const dataSelected = posts?.find((item: any) => item?.slug === slug);
  const { loading } = useAppSelector((state: any) => state.PostReducer);
  return (
    <>
      <NewsDetailComponent data={dataSelected} dataArr={posts} loading={loading} dataName="" />
    </>
  );
};

export default NewsDetail;
