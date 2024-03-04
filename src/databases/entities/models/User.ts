// User.ts
import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import Client from "./Client";

// Definir el enum para los tipos de usuario
export enum UserType {
  ADMIN = "admin",
  USER = "user"
}

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: "enum", enum: UserType, default: UserType.USER }) // Definir la columna para el tipo de usuario
  type: UserType; // Nueva columna para el tipo de usuario

  @Column({ unique: true, nullable: true })
  rtToken: string;

  // Definir la relación uno a uno con la tabla Client
  @OneToOne(() => Client, (client: Client) => client.user, { cascade: true })
  @JoinColumn()
  client: Client;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
