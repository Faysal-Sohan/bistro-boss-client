import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <h3 className="text-2xl">Hi, Welcome {user?.displayName ? user?.displayName : 'back'}!</h3>
        </div>
    );
};

export default UserHome;