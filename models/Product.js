import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  tags: { type: [String], required: true },
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  weight: { type: Number, required: true },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true }
  },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  reviews: {
    type: [{
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      date: { type: Date, required: true },
      reviewerName: { type: String, required: true },
      reviewerEmail: { type: String, required: true }
    }], required: true
  },
  returnPolicy: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  meta: {
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    barcode: { type: String, required: true },
    qrCode: { type: String, required: true }
  },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true }
}, {
  timestamps: true
});

const Product = models.Product || model('Product', ProductSchema);
export default Product;