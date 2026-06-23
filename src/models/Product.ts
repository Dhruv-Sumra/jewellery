import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  images: string[];
  weightInGrams: number;
  makingCharges: number;
  purity: number;
  category: 'ring' | 'necklace' | 'bracelet' | 'earring' | 'pendant' | 'anklet';
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    weightInGrams: { type: Number, required: true },
    makingCharges: { type: Number, required: true },
    purity: { type: Number, required: true, default: 925 },
    category: {
      type: String,
      enum: ['ring', 'necklace', 'bracelet', 'earring', 'pendant', 'anklet'],
      required: true,
    },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ category: 1, featured: -1 });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
