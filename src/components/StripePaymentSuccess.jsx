import { Button } from "antd";
import { Link } from "react-router-dom";
import Layout from "../Layouts/index";

const StripePaymentSuccess = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2% 20% 0% 20%",
        }}
      >
        <h2>Thanks for your order!</h2>
        <h4>Your payment is successful.</h4>
        <p>
          We appreciate your business! If you have any questions, please email
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <div>
          <Link to="/order">
            <Button className="button"> Go to Order page</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default StripePaymentSuccess;
