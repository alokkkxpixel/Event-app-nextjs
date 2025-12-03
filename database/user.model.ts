import mongoose, { Schema, Document, model, models } from "mongoose";
import slugify from "slugify";

// ----------------------
// TypeScript Interface
// ----------------------
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------------
// Mongoose Schema
// ----------------------
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be at most 20 characters"],
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // ❗ hide password in queries unless explicitly asked
    },

    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// --------------------------------------
// Auto-generate slug from username
// --------------------------------------
UserSchema.pre("save",  async function (next) {
    //if the username is modify or change then generate new Slug
  if (this.isModified("username")|| this.isNew) {

      this.slug = generateSlug(this.username)
  }

 
});

// Helper function to generate URL-friendly slug
function generateSlug(username: string): string {
  return username
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}




// --------------------------------------
// Unique Index for Fast Lookup
// --------------------------------------
UserSchema.index({ slug: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

// --------------------------------------
// Export Model
// --------------------------------------
const User = models.User || model<IUser>("User", UserSchema);
export default User;
