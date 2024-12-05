import List from "../components/Fragments/List";
import Navbar from "../components/Layouts/Navbar";
import Swal from "sweetalert2";

const Home = () => {
  const notification = sessionStorage.getItem("notification");

  if (notification) {
    Swal.fire({
      title: "Success!",
      text: notification,
      icon: "success",
      confirmButtonText: "OK",
    });
    sessionStorage.removeItem("notification");
  }

  return (
    <div className="px-3">
      <Navbar />
      <List />
    </div>
  );
};

export default Home;
