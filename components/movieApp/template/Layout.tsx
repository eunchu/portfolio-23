import Header from "@/components/movieApp/organism/Header";
import Footer from "@/components/movieApp/organism/Footer";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
