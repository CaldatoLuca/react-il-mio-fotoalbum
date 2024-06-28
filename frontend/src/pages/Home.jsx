import Jumbo from "../components/Jumbo";
import Main from "../components/Main";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default () => {
  return (
    <>
      <div className="bg-neutral-100">
        <Jumbo />
        <Main />
        <ContactForm />
        <Footer />
      </div>
    </>
  );
};
