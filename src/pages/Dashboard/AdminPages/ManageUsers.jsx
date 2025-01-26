// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaUsers } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: users = [], refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res.data;
//     },
//   });

//   const handleMakeAdmin = (user) => {
//     axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
//       console.log(res.data);
//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: `${user.name} is an Admin Now!`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });
//   };

//   return (
//     <div>
//       <div className="flex justify-evenly my-4">
//         <h2 className="text-3xl">All Users</h2>
//         <h2 className="text-3xl">Total Users: {users.length}</h2>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           {/* head */}
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user._id}>
//                 <th>{index + 1}</th>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   {user.role === "admin" ? (
//                     "Admin"
//                   ) : (
//                     <button
//                       onClick={() => handleMakeAdmin(user)}
//                       className="btn btn-lg bg-orange-600"
//                     >
//                       <FaUsers className="text-white text-2xl"></FaUsers>
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;



import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Pagination from "../../../modules/Pagination";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-lg bg-orange-600"
                    >
                      <FaUsers className="text-white text-2xl" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default AllUsers;
