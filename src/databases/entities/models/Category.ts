// CategoryModel.ts

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany
} from "typeorm";
import Product from "./Product";

@Entity()
class Category {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column()
  name: string; // Nombre de la categoria

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // Definir la relación muchos a muchos con la tabla de Producto
  @ManyToMany(() => Product)
  products: Product[];
}

export default Category;
