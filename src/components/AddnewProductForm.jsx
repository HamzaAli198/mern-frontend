import React from "react";
import { Controller, useForm } from "react-hook-form";

const AddnewProductForm = () => {
  const categories = ["Men", "Women", "Kids", "Accessories", "Footwear"];
  const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <div className="p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          {/* Product Name */}
          <div>
            <label className="block font-semibold">Product Title</label>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter product title"
                  type="text"
                />
              )}
            />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          </div>

          {/* Description*/}
          <div>
            <label className="block font-semibold">Product Description</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "description is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Enter description"
                ></textarea>
              )}
            />
            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block font-semibold">Category</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "category is required" }}
              render={({ field }) => (
                <select {...field} className="w-full p-2 border rounded-md">
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            />
            <p className="text-red-500 text-sm">{errors.category?.message}</p>
          </div>

          {/* Brand Dropdown */}
          <div>
            <label className="block font-semibold">Brand</label>
            <Controller
              name="brand"
              control={control}
              rules={{ required: "brand is required" }}
              render={({ field }) => (
                <select {...field} className="w-full p-2 border rounded-md">
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              )}
            />
            <p className="text-red-500 text-sm">{errors.brand?.message}</p>
          </div>

          {/* Product price */}
          <div>
            <label className="block font-semibold">Price</label>
            <Controller
              name="price"
              control={control}
              rules={{ required: "price is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter product price"
                  type="number"
                />
              )}
            />
            <p className="text-red-500 text-sm">{errors.price?.message}</p>
          </div>

          {/* sale price */}
          <div>
            <label className="block font-semibold">Sale Price</label>
            <Controller
              name="sale_price"
              control={control}
              rules={{ required: "sale price is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter product sale price"
                  type="number"
                />
              )}
            />
            <p className="text-red-500 text-sm">{errors.sale_price?.message}</p>
          </div>

          {/* product quantity*/}
          <div>
            <label className="block font-semibold">Total Stock</label>
            <Controller
              name="qtny"
              control={control}
              rules={{ required: "quantity is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter product quantity"
                  type="number"
                />
              )}
            />
            <p className="text-red-500 text-sm">{errors.qtny?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddnewProductForm;
