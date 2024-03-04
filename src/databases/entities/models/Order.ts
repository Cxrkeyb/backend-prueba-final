import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import Client from "./Client";
import Product from "./Product";

@Entity()
class Order {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  // Definir la relación muchos a uno con la tabla de Client
  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  // Definir la relación muchos a muchos con la tabla de Product
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Order;
