import Header from "@/components/movieApp/organism/Header";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
