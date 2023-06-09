import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes} from "http-status-codes";

interface Icidade {
  nome: string
}

const bodyValidation: yup.ObjectSchema<Icidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, Icidade> , res: Response) =>  {
  // const data: Icidade = req.body;

  let validatedData: Icidade | undefined = undefined;

  try {
    validatedData =  await bodyValidation.validate(req.body);
    
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: yupError.message
      }
    });
  }

  console.log(validatedData);


  return res.send("Criando cidade");
};