import Layout from "../Layouts/index";

const StripePaymentCancel = () => {
  return (
    <>
      <Layout>
        <h4>Oops! Your payment has been cancelled.</h4>
        <p>
          We appreciate your business! If you have any questions, please email
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <div>
          <button> Go to Home page</button>
        </div>
      </Layout>
    </>
  );
};

export default StripePaymentCancel;
