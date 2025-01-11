import { useNavigate } from "react-router-dom";
import { useGetOrderHistoryQuery } from "../../hooks/orderHooks";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../component/loadingBox/LoadingBox";
import MessageBox from "../../component/messageBox/MessageBox";
import { getError } from "../../utils/utils";
import { Button } from "react-bootstrap";
import './OrderHistoryPage.css'

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetOrderHistoryQuery();

  return (
    <div className="order-history-container">
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1 className="order-history-title">Order History</h1>

      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error)}
        </MessageBox>
      ) : (
        <div className="order-table-container">
          <table className="order-history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders!.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="status-badge paid">Paid</span>
                    ) : (
                      <span className="status-badge unpaid">Unpaid</span>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className="status-badge delivered">Delivered</span>
                    ) : (
                      <span className="status-badge not-delivered">
                        Not Delivered
                      </span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
