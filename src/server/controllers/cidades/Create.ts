import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middleware";

interface Icidade {
  nome: string
}
const bodyValidation : yup.ObjectSchema<Icidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const createValidation = validation({
  body: bodyValidation,
});


export const create = async (req: Request<{}, {}, Icidade> , res: Response) =>  {
  // const data: Icidade = req.body;
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);
};