// Enterprise.ts
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import Product from "./Product"; // Importar la clase Product

@Entity()
class Enterprise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
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

  @OneToMany(() => Product, (product) => product.enterprise, {
    onDelete: "CASCADE" // Esta opción especifica eliminación en cascada
  })
  products: Product[]; // Propiedad para acceder a los productos asociados con esta empresa
}

export default Enterprise;
