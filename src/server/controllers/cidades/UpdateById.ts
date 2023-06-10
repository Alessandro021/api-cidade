import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";


interface IParmProps {
  id?: number;
}
interface IBodyProps {
  nome: string;
}

const updateParamsValidation : yup.ObjectSchema<IParmProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
});

const updateBodyValidation : yup.ObjectSchema<IBodyProps> = yup.object().shape({
  nome: yup.string().required().min(3),
});


export const updateByIdValidation = validation({
  body: updateBodyValidation,
  params: updateParamsValidation,
});




export const updateById = async (req: Request<IParmProps, {}, IBodyProps> , res: Response) =>  {
  // const data: Icidade = req.body;


  console.log(req.params);
  console.log(req.body);


  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não Implementado");
};