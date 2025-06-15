import mongoose from "mongoose";
const { Schema } = mongoose;

const ecommerceSchema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => typeof v === "number" && !isNaN(v),
        message: (props) => `${props.value} is not a valid number`,
      },
    },
  },

  { timestamps: true }
);

const Ecommerce = mongoose.model("Ecommerce", ecommerceSchema);

export default Ecommerce;
