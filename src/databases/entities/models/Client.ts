// Client.ts
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import Order from "./Order";
import User from "./User";

@Entity()
class Client {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  country: string;

  // Definir la relación uno a uno con la tabla User
  @OneToOne(() => User, (user: User) => user.client)
  @JoinColumn()
  user: User;

  // Relación uno a muchos con la tabla de Order
  @OneToMany(() => Order, (order: Order) => order.client)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Client;
