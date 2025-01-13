import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaComment,
} from "react-icons/fa";
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";
import { useQuery, useMutation } from '@tanstack/react-query';
import * as Yup from "yup";
import { getPost, likePost, dislikePost } from '../../../API/posts/postsAPI';
import { getUsersAPI, userFollowAPI, userUnfollowAPI } from '../../../API/users/usersAPI';


const PostDetails = () => {
  const [comment, setComment] = useState("");

  const { id }  = useParams();

  const { isLoading, data, error, isSuccess, refetch: refetchPost } = useQuery({
    queryKey: ['post-details'],
    queryFn: () => getPost(id),
  });

  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUsersAPI(),
  });

  const userId = profileData?._id;
  const authorId = data?.author;
  const isFollowing = profileData?.following?.find((user) => user?.toString() === authorId?.toString());
  const postId = data?._id;

  console.log(postId)
  console.log(data)

  const followUserMutation = useMutation({
    mutationKey: ['follow-user'],
    mutationFn: userFollowAPI,
  })

  const followUserHandler = async () => {
    followUserMutation
    .mutateAsync(authorId)
    .then(() => {
      refetchProfile()
    }).catch(() => {})
  }

  const unfollowUserMutation = useMutation({
    mutationKey: ['unfollow-user'],
    mutationFn: userUnfollowAPI,
  })

  const unfollowUserHandler = async () => {
    unfollowUserMutation
    .mutateAsync(authorId)
    .then(() => {
      refetchProfile()
    }).catch(() => {})
  }

  const likePostMutation = useMutation({
    mutationKey: ['like-post'],
    mutationFn: likePost,
  })

  const likePostHandler = async () => {
    likePostMutation
    .mutateAsync(postId)
    .then(() => {
      refetchPost()
    }).catch(() => {})
  }

  const dislikePostMutation = useMutation({
    mutationKey: ['unfollow-user'],
    mutationFn: dislikePost,
  })

  const dislikePostHandler = async () => {
    dislikePostMutation
    .mutateAsync(postId)
    .then(() => {
      refetchPost()
    }).catch(() => {})
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <img
          src="https://cdn.pixabay.com/photo/2023/12/19/15/51/flowers-8457960_1280.jpg"
          // alt={postData?._id}
          className="w-full h-full object-cover rounded-lg mb-4"
        />
        <div className="flex gap-4 items-center mb-4">
          <span
            className="flex items-center gap-1 cursor-pointer"
            onClick={likePostHandler}
          >
            <FaThumbsUp />
            {data?.likes?.length || 0}
          </span>
          <span
            className="flex items-center gap-1 cursor-pointer"
            onClick={dislikePostHandler}
          >
            <FaThumbsDown />

             {data?.dislikes?.length || 0} 
          </span>
          <span className="flex items-center gap-1">
            <FaEye />
            {/* {postData?.viewsCount || 0} */}
          </span>
        </div>
        {isFollowing ? (
          <button
            onClick={unfollowUserHandler}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <RiUserUnfollowFill className="mr-2" />
            Unfollow
          </button>
        ) : (
          <button
            onClick={followUserHandler}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Follow
            <RiUserFollowLine className="ml-2" />
          </button>
        )}

        {/* author */}
        <span className="ml-2">{/* {postData?.author?.username} */}</span>

        {/* post details */}
        <div className="flex justify-between items-center mb-3">
          <div
            className="rendered-html-content mb-2"
            dangerouslySetInnerHTML={{ __html: data?.postFound?.description }}
          />

          {/* Edit delete icon */}
          <div className="flex gap-2">
            <FaEdit className="text-blue-500 cursor-pointer" />
            <FaTrashAlt className="text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Comment Form */}
        <form>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-lg mb-2"
            rows="3"
            placeholder="Add a comment..."
            value={comment}
            // onChange={(e) => setComment(e.target.value)}
            // {...formik.getFieldProps("content")}
          ></textarea>
          {/* comment error */}
          {/* {formik.touched.content && formik.errors.content && (
            <div className="text-red-500 mb-4 mt-1">
              {formik.errors.content}
            </div>
          )} */}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            <FaComment className="inline mr-1" /> Comment
          </button>
        </form>
        {/* Comments List */}
        <div>
          <h2 className="text-xl font-bold mb-2">Comments:</h2>
          {/* {postData?.comments?.map((comment, index) => (
            <div key={index} className="border-b border-gray-300 mb-2 pb-2">
              <p className="text-gray-800">{comment.content}</p>
              <span className="text-gray-600 text-sm">
                - {comment.author?.username}
              </span>
              <small className="text-gray-600 text-sm ml-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;