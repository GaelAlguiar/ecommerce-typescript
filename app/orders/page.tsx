import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullDate";
import ManageOrdersClient from "./OrderClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access Denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No orders yet" />;
  }

  return (
    <div className="p-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
