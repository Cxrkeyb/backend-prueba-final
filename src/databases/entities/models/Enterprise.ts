// Enterprise.ts
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany
} from "typeorm";
import Product from "./Product"; // Importar la clase Product

@Entity()
class Enterprise {
  @PrimaryColumn({
    unique: true
  })
  nit: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.enterprise) // Relación uno a muchos con Product
  products: Product[]; // Propiedad para acceder a los productos asociados con esta empresa
}

export default Enterprise;
