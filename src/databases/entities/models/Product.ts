// Product.ts
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
  JoinTable,
  ManyToOne
} from "typeorm";
import Category from "./Category";
import Order from "./Order";
import Enterprise from "./Enterprise"; // Importar la clase Enterprise

export class Currency {
  code: string;
  price: number;
}

@Entity()
class Product {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column()
  name: string;

  @Column()
  productCode: string;

  @Column()
  productProperties: string;

  @Column("jsonb")
  currencies: Currency[];

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.products) // Relación muchos a uno con Enterprise
  enterprise: Enterprise; // Propiedad para acceder a la empresa a la que pertenece este producto

  @ManyToMany("Order", (order: Order) => order.products)
  orders: Order[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

export default Product;
