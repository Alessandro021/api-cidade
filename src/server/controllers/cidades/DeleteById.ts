import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";


interface IParmProps {
  id?: number;
}

const deleteParamsValidation : yup.ObjectSchema<IParmProps> = yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
});

export const deleteByIdValidation = validation({
  params: deleteParamsValidation,
});




export const deleteById = async (req: Request<IParmProps> , res: Response) =>  {
  // const data: Icidade = req.body;


  console.log(req.params);


  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não Implementado");
};