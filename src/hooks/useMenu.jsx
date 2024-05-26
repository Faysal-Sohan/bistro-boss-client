import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    const axiosPublice = useAxiosPublic();
    
    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey:['menu'],
        queryFn: async () => {
            const res = await axiosPublice.get('/menu');
            return res.data;
        }
    })
    return [menu, loading, refetch]
}

export default useMenu;