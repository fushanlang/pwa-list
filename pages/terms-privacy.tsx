import { NextPage } from "next";
import Layout from "../components/Layout/Layout";
const TermsPrivacy: NextPage = () => {
  return (
    <Layout title="Terms of Service & Privacy">
      <div className="text-lg px-7 py-9">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p>
          These terms and conditions govern the access to and the use of PWA List' services and platforms, through the website.
          All users must comply with the terms and conditions on this page to be able to use PWA List and its services and
          platforms.
        </p>
        <h2 className="text-2xl font-bold mb-1 mt-4">Privacy Policy</h2>
        <p>
          You understand that through your use of the Services, you consent to the collection and use of your data and
          information, as set forth in the Privacy Policy. You need to read it before you use or access the Services.
        </p>
        <h2 className="text-2xl font-bold mb-1 mt-4">Denial of Access</h2>
        <p>PWA List has the right to block any user from accessing the website or using it's services in general.</p>
        <h2 className="text-2xl font-bold mb-1 mt-4">Broken Link Apps</h2>
        <p>PWA List reserves the right to remove any Broken Link Apps.</p>
        <h2 className="text-2xl font-bold mb-1 mt-4">E-mail</h2>
        <p>
          PWA List has the right to e-mail users with what PWA List sees adequate with the option to unsubscribe from notification
          e-mails.
        </p>
        <h2 className="text-2xl font-bold mb-1 mt-4">Modifications of Terms and Conditions</h2>
        <p>We have the right to modify terms and conditions if needed and whenever adequate.</p>
        <h1 className="font-bold text-3xl mt-6 mb-5">Privacy Policy</h1>
        <p>
          At PWA List. We care for the privacy & protection of our users and their data and we would like to share with you our
          policy and practices regarding your information and its privacy. Our Privacy Policy outlines what data is collected from
          our users and how it is used and processed. It also highlights how our users can control their data.
        </p>
        <h2 className="text-2xl font-bold mb-1 mt-4">Sharing of data</h2>
        <p>
          PWA List will only share any collected data when it is necessary for our service to function, when it is legally
          required, or when you give us your permission.
        </p>
        <p>
          For our service to function, the collected data will be provided to hosting services like Google Firebase and analytics
          services such as Google Analytics.
        </p>
        <h2 className="text-2xl font-bold mb-1 mt-4">Retention of data</h2>
        <p>We will retain the collected data for as long as is necessary for the purposes listed in this Privacy Policy.</p>
        <h2 className="text-2xl font-bold mb-1 mt-4">Links to External Sites</h2>
        <p>
          PWA List provides links to many external websites and apps. These services, unless otherwise noted, are not associated
          with PWA List and we are not responsible for their privacy practices.
        </p>
        <h2 className="text-2xl font-bold mb-1 mt-4">Changes to the Privacy Policy</h2>
        <p>
          You will always be able to find the latest version of the Privacy Policy on this page. We reserve the right to modify
          this policy at any time, changes being effective immediately, so please review the page periodically.
        </p>
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns, please contact us by sending email.</p>
        <a className="text-green-500" href="mailto:hello.pwalist@gmail.com">
          hello.pwalist@gmail.com
        </a>
      </div>
    </Layout>
  );
};

export default TermsPrivacy;
