import Header from "@/components/movieApp/Header";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
