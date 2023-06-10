import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";


interface Icidade {
  nome: string
}
const bodyValidation : yup.ObjectSchema<Icidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});


// interface IFilter {
//   filter?: string;
// }
// const queryValidation : yup.ObjectSchema<IFilter> = yup.object().shape({
//   filter: yup.string().optional().min(3),
// });


export const createValidation = validation({
  body: bodyValidation,
});




export const create = async (req: Request<{}, {}, Icidade> , res: Response) =>  {
  // const data: Icidade = req.body;


  console.log(req.body);


  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não Implementado");
};