import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

const UpdateItems = () => {
    const menuItem = useLoaderData();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        
            const item = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: menuItem.image
            };
            const itemRes = await axiosSecure.patch(`/menu/${menuItem._id}`, item);
            if (itemRes.data.modifiedCount > 0) {
                // display success message
                // refetch();
                navigate(-1);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated in the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        
    };
    return (
        <div>
            <h2 className="text-4xl font-medium text-center">Update Item</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full mb-4">
                    <div className="label">
                        <span className="label-text">Recipe Name*</span>
                    </div>
                    <input
                        {...register("name", { required: true })}
                        defaultValue={menuItem.name}
                        type="text"
                        placeholder="Recipe Name"
                        className="input input-bordered w-full" />
                </label>
                <div className="flex gap-6">
                    
                    <label className="form-control w-full mb-4">
                        <div className="label">
                            <span className="label-text">Category*</span>
                        </div>
                        <select
                            defaultValue={menuItem.category}
                            {...register("category", { required: true })}
                            className="select select-bordered w-full">
                            <option disabled value="default">Select a category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </label>
                   
                    <label className="form-control w-full mb-4">
                        <div className="label">
                            <span className="label-text">Price*</span>
                        </div>
                        <input
                            {...register("price", { required: true })}
                            defaultValue={menuItem.price}
                            type="number"
                            placeholder="Price"
                            className="input input-bordered w-full" />
                    </label>
                </div>

                <label className="form-control mb-4">
                    <div className="label">
                        <span className="label-text">Recipe Details*</span>
                    </div>
                    <textarea
                        {...register("recipe", { required: true })}
                        defaultValue={menuItem.recipe}
                        className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                </label>
                <button className="btn">
                    Update Recipe Details <FaUtensils className="ml-2"></FaUtensils>
                </button>
            </form>
        </div>
    );
};

export default UpdateItems;