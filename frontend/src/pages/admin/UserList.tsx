import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import ButtonLinkCustom from "../../components/ButtonLinkCustom";
import { getErrorMessage } from "../../utils/handleErrorMessage";
import { User } from "../../types/User";


const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery({});

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {getErrorMessage(error)}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                <FaCheck style={{ color: "green" }} />
                ) : (
                <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                {!user.isAdmin && (
                <>
                  <ButtonLinkCustom
                  to={`/admin/user/${user._id}/edit`}
                  style={{ marginRight: "10px" }}
                  variant="light"
                  className="btn-sm"
                  >
                  <FaEdit />
                  </ButtonLinkCustom>
                  <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(user._id)}
                  >
                  <FaTrash style={{ color: "white" }} />
                  </Button>
                </>
                )}
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserList;
