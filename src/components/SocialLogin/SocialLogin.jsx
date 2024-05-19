
import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSocialLogin = () => {
        googleSignIn()
        .then(result => {
            console.log(result)
            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email
            }
            axiosPublic.post('/users', userInfo)
            .then(result => {
                console.log(result.data)
                navigate('/')
            })
        }) 
    }

    return (
        <div>
            <button className='btn flex items-center gap-2 p-4' onClick={handleSocialLogin}>
                <FaGoogle></FaGoogle>
                Google Login
            </button>
        </div>
    );
};
export default SocialLogin;