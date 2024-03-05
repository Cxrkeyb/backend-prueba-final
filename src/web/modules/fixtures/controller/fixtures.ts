// fixturesController.ts

import { UserType } from "../../../../databases/entities/models/User";
import {
  CategoryRepo,
  ClientRepo,
  EnterpriseRepo,
  OrderRepo,
  ProductRepo,
  UserRepo
} from "../../../../databases/repos";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

export async function generateFixtures(req: Request, res: Response): Promise<void> {
  try {
    // Lógica para generar datos de prueba y almacenarlos en la base de datos

    const user = await UserRepo.save({
      name: "Wilson Parada",
      email: "cxrkeybwp2004@gmail.com",
      password: bcrypt.hashSync("1234", 10),
      type: UserType.ADMIN
    });

    const clientUserAdmin = await ClientRepo.save({
      address: "Calle 123",
      phoneNumber: "1234567890",
      country: "Colombia",
      user: user // Referencia al usuario insertado
    });

    await UserRepo.update(user.id, { client: clientUserAdmin });

    const userClient = await UserRepo.save({
      name: "Client Test",
      email: "clienttest@gmail.com",
      password: bcrypt.hashSync("1234", 10),
      type: UserType.USER
    });

    const clientUser = await ClientRepo.save({
      address: "Calle 123",
      phoneNumber: "1234567890",
      country: "Colombia",
      user: userClient // Referencia al usuario insertado
    });

    await UserRepo.update(userClient.id, { client: clientUser });

    // Enterprise
    const enterprise = await EnterpriseRepo.save({
      nit: "1234567890-1",
      name: "Enterprise Test",
      address: "Calle 123",
      phoneNumber: "1234567890"
    });

    // Crear categorías de prueba
    const categoryNames = ["Electrónica", "Ropa", "Hogar", "Deportes", "Alimentos", "Juguetes"];
    const promiseCategories = [];
    for (let categoryName of categoryNames) {
      promiseCategories.push(
        CategoryRepo.save({
          name: categoryName
        })
      );
    }

    await Promise.all(promiseCategories);

    // Obtener todas las categorías creadas
    const categories = await CategoryRepo.find();

    // Crear productos de prueba
    const promiseProducts = [];
    for (let i = 0; i < 10; i++) {
      // Seleccionar categorías aleatorias para el producto
      const randomCategories = categories
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * categories.length));

      const product = ProductRepo.create({
        name: `Product ${i}`,
        productCode: `P${i}`,
        productProperties: "some properties", // assuming productProperties is a string
        currencies: {
          USD: 10 + i, // convert to string
          EUR: 20 + i,
          GBP: 30 + i
        },
        active: i % 2 === 0, // no need for ternary operator
        enterprise: enterprise // Assuming enterprise is correctly typed
      });

      product.categories = randomCategories; // Asignar categorías aleatorias al producto

      const savedProduct = await ProductRepo.save(product); // Esperar a que el producto se guarde
      promiseProducts.push(savedProduct); // Agregar el producto guardado al array de promesas de productos
    }

    // Esperar a que todas las promesas de productos se completen
    await Promise.all(promiseProducts);

    // Crear varias órdenes de prueba
    const orderPromises = [];
    for (let i = 0; i < 5; i++) {
      const order = OrderRepo.create({
        client: i % 2 === 0 ? clientUserAdmin : clientUser,
        products: promiseProducts.slice(i * 2, i * 2 + 2) // Seleccionar productos en grupos de 2 desde el array de productos guardados
      });

      orderPromises.push(OrderRepo.save(order));
    }

    // Esperar a que se completen todas las promesas de guardado de órdenes
    await Promise.all(orderPromises);

    // Puedes agregar más lógica para generar otros datos de prueba

    res.status(200).json({ status: "OK", message: "Datos de prueba generados exitosamente." });
  } catch (error) {
    console.error("Error generando datos de prueba:", error);
    res.status(500).json({ error: "Error generando datos de prueba." });
  }
}
