import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getUsersAPI } from "../../../API/users/usersAPI";
import { deletePost } from "../../../API/posts/postsAPI";

const DashboardPosts = () => {
  const truncateString = () => {};
  const {data, isLoading, isError, refetch} = useQuery({
      queryKey: ['profile'],
      queryFn: getUsersAPI,
    })
 const deletePostMutation = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: deletePost,
  });

  const handleDelete = async (postId) => {
    await deletePostMutation.mutateAsync(postId);
    refetch();
  };
  const userPosts = data?.posts;
  return (
    <section className="py-8">
      {userPosts?.length < 0 ? (
        <div>Não tem posts</div>
      ) : (
        <section className="py-8">
          <div className="container px-4 mx-auto">
            <div className="pt-4 bg-white shadow rounded">
              <div className="flex px-6 pb-4 border-b">
                <h3 className="text-xl font-bold">
                  Seus Posts ({userPosts?.length}) 
                </h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 text-left">
                      <th className="pb-3 font-medium ">Post</th>
                      <th className="pb-3 font-medium">Recompensas mensais</th>
                      <th className="pb-3 font-medium">Total </th>
                      <th className="pb-3 font-medium">Data de criação</th>
                      <th className="pb-3 font-medium">
                        Próxima data de recompensa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userPosts?.map((post) => {
                      return (
                        <tr className="text-xs bg-gray-50" key={post._id}>
                          <td className="py-5 px-6 font-medium flex items-center space-x-2">
                          <div
                      className="rendered-html-content mb-2"
                      dangerouslySetInnerHTML={{ __html: post?.description?.substring(0, 20) + (post?.description?.length > 20 ? '...' : '') }}/>
                          </td>
                          <td className="font-medium">
                            $ {post?.thisMonthEarnings || 0}
                          </td>
                          <td className="font-medium">
                            $ {post?.totalEarnings || 0}
                          </td>
                          <td className="font-medium">
                            {new Date(post.createdAt).toDateString()}
                          </td>
                          <td>
                            <span className="inline-block py-1 px-2 text-white bg-green-500 rounded-full">
                              {new Date(post.nextEarningDate).toDateString()}
                            </span>
                          </td>
                          <td className="flex items-center mb-10 space-x-2">
                            <Link to={`/dashboard/update-post/${post._id}`}>
                              <FiEdit className="text-green-500 cursor-pointer" />
                            </Link>
                           <button onClick={() => handleDelete(post._id)}>
                              <FiTrash2 className="text-red-500 cursor-pointer" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default DashboardPosts;