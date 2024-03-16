

import Navbar from "../../components/Navbar/navbar";
import FileUpload from "../../components/FIleUpload/upload";

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="flex align-middle justify-center">
                <div className="max-w-screen-md w-full p-8 md:mt-28">
                    <FileUpload />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
