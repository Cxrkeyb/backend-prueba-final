import { Request, Response } from "express";
import { EnterpriseRepo } from "../../../../databases/repos/index";

/**
 * @summary Get all enterprises
 * @param {Request} req request of the express should contain the body with the data of the user
 * @param {Response} res response of the express, if the user is created then return the user data else return a message indicating the error
 * @returns {Promise<void>} The response of the express with the user data or an error message
 */
async function getEnterprises(req: Request, res: Response): Promise<void> {
  try {
    const enterprises = await EnterpriseRepo.find();
    res.status(200).json(enterprises);
  } catch (error) {
    console.error("Error getting enterprises:", error);
    res.status(500).json({ error: "Error getting enterprises" });
  }
}

async function getEnterpriseById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const enterprise = await EnterpriseRepo.findOne({
      where: { nit: id }
    });
    res.status(200).json(enterprise);
  } catch (error) {
    console.error("Error getting enterprise:", error);
    res.status(500).json({ error: "Error getting enterprise" });
  }
}

/**
 * @summary Create a new enterprise
 * @param {Request} req request of the express should contain the body with the data of the user
 * @param {Response} res response of the express, if the user is created then return the user data else return a message indicating the error
 * @returns {Promise<void>} The response of the express with the user data or an error message
 */
async function createEnterprise(req: Request, res: Response): Promise<void> {
  const { nit, name, address, phoneNumber } = req.body;

  try {
    if (!nit || !name || !address || !phoneNumber) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const nitValidator = await EnterpriseRepo.findOne({
      where: { nit }
    });

    if (nitValidator) {
      res.status(400).json({ error: "Enterprise already registered" });
      return;
    }

    const enterprise = await EnterpriseRepo.insert({
      nit,
      name,
      address,
      phoneNumber
    });
    res.status(201).json(enterprise);
  } catch (error) {
    console.error("Error creating enterprise:", error);
    res.status(500).json({ error: "Error creating enterprise" });
  }
}

/**
 * @summary Update an enterprise
 * @param {Request} req request of the express should contain the body with the data of the user
 * @param {Response} res response of the express, if the user is created then return the user data else return a message indicating the error
 * @returns {Promise<void>} The response of the express with the user data or an error message
 */
async function updateEnterprise(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { nit, name, address, phoneNumber } = req.body;

  try {
    if (!nit || !name || !address || !phoneNumber) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const nitValidator = await EnterpriseRepo.findOne({
      where: { nit: id }
    });

    if (!nitValidator) {
      res.status(400).json({ error: "Enterprise not found" });
      return;
    }

    await EnterpriseRepo.update(
      {
        nit: id
      },
      {
        name,
        address,
        phoneNumber,
        nit
      }
    );
    res.status(201).json(
      await EnterpriseRepo.findOne({
        where: { nit: id }
      })
    );
  } catch (error) {
    console.error("Error creating enterprise:", error);
    res.status(500).json({ error: "Error creating enterprise" });
  }
}

/**
 * @summary Update an enterprise
 * @param {Request} req request of the express should contain the body with the data of the user
 * @param {Response} res response of the express, if the user is created then return the user data else return a message indicating the error
 * @returns {Promise<void>} The response of the express with the user data or an error message
 */
async function deleteEnterprise(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const enterprise = await EnterpriseRepo.findOne({
      where: { nit: id }
    });

    if (!enterprise) {
      res.status(400).json({ error: "Enterprise not found" });
      return;
    }

    await EnterpriseRepo.delete({
      nit: id
    });
    res.status(201).json({ message: "Enterprise deleted" });
  } catch (error) {
    console.error("Error deleting enterprise:", error);
    res.status(500).json({ error: "Error deleting enterprise" });
  }
}

export { getEnterprises, createEnterprise, updateEnterprise, getEnterpriseById, deleteEnterprise };
