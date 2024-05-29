import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaUsers, FaUtensilSpoon } from "react-icons/fa";
import CustomShapeBarChart from "./CustomShapeBarChart";
import CustomPieChart from "./CustomPieChart";

const AdminHome = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: admin_stats = {} } = useQuery({
        queryKey: ['admin_stats', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['chart-stats', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    })

    return (
        <div>
            <h3 className="text-2xl my-4">Hi, Welcome {user?.displayName ? user?.displayName : 'back'}!</h3>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                       <FaDollarSign className="text-3xl"></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${admin_stats.revenue}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{admin_stats.users}</div>
                    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl"></FaBook>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{admin_stats.orders}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUtensilSpoon className="text-3xl"></FaUtensilSpoon>
                    </div>
                    <div className="stat-title">Menu Items</div>
                    <div className="stat-value">{admin_stats.menuItems}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
            </div>
            <div className="flex gap-2">
                <div className="w-1/2">
                    <CustomShapeBarChart data={chartData}></CustomShapeBarChart>
                </div>
                <div className="w-1/2">
                    <CustomPieChart chartData={chartData}></CustomPieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;