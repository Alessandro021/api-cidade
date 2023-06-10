import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { StatusCodes} from "http-status-codes";
import { Validation } from "../../shared/middleware";


interface Icidade {
  nome: string
  estado: string
}
const bodyValidation : yup.ObjectSchema<Icidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

interface IFilter {
  filter?: string;
}
const queryValidation : yup.ObjectSchema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});



export const createValidation = Validation({
  body: bodyValidation,
  query: queryValidation
});




export const create = async (req: Request<{}, {}, Icidade> , res: Response) =>  {
  // const data: Icidade = req.body;


  console.log(req.body);


  return res.send("Criando cidade");
};