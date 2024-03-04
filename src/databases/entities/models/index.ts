import User from "./User";
import Product from "./Product";
import Enterprise from "./Enterprise";
import Client from "./Client";
import Order from "./Order";
import Category from "./Category";

export { User, Product, Enterprise, Client, Order, Category };

export default [User, Product, Enterprise, Client, Order, Category] as const;
