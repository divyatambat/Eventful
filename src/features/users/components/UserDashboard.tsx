import Footer from "../../../app/components/Footer";
import UserSidebar from "./profile/UserSidebar";

const UserDashboard = () => {
    return (
        <div>
            <h1 className="headings">User Profile</h1>
            <UserSidebar />
            <Footer />
        </div>
    )
}

export default UserDashboard;