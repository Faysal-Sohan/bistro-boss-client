import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublice = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`;

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublice.post(imageUploadUrl, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // post the item to menu
            const item = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            };
            const itemRes = await axiosSecure.post('/menu', item);
            if (itemRes.data.insertedId) {
                // display success message
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            console.log(itemRes.data);
        }
        console.log(res.data);
    };
    return (
        <div>
            <SectionTitle heading="Add an Item" subHeading="Whats new?"></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full mb-4">
                    <div className="label">
                        <span className="label-text">Recipe Name*</span>
                    </div>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Recipe Name"
                        className="input input-bordered w-full" />
                </label>
                <div className="flex gap-6">
                    {/* category */}
                    <label className="form-control w-full mb-4">
                        <div className="label">
                            <span className="label-text">Category*</span>
                        </div>
                        <select
                            defaultValue="default"
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
                    {/* price */}
                    <label className="form-control w-full mb-4">
                        <div className="label">
                            <span className="label-text">Price*</span>
                        </div>
                        <input
                            {...register("price", { required: true })}
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
                        className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                </label>
                <div className="form-control w-full mb-4">
                    <input
                        {...register("image", { required: true })}
                        type="file"
                        className="file-input w-full max-w-xs" />
                </div>
                <button className="btn">
                    Add Item <FaUtensils className="ml-2"></FaUtensils>
                </button>
            </form>
        </div>
    );
};

export default AddItems;