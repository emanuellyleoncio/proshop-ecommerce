import { Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import ButtonLinkCustom from "../../components/ButtonLinkCustom";
import { Order } from "../../types/Order";
import { getErrorMessage } from "../../utils/handleErrorMessage";


const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery({});

  return (
    <>
      <h1>Orders</h1>
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
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                order.paidAt?.substring(0, 10)
                ) : (
                <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                order.deliveredAt?.substring(0, 10)
                ) : (
                <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                <ButtonLinkCustom to={`/order/${order._id}`} variant="light" className="btn-sm">  
                Details
                </ButtonLinkCustom>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderList;
