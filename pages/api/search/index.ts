import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { setLimitsAndOffset } from "../../../lib/limits";
import { searchProductsAlgolia } from "../../../controllers/search";
import { runCorsMiddleware } from "../../../lib/middlewares";

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const finalSet = setLimitsAndOffset(
    parseInt(req.query.limit as string),
    parseInt(req.query.offset as string)
  );

  try {
    const result = await searchProductsAlgolia(
      req.query.q as string,
      finalSet.finalOffset,
      finalSet.finalLimit
    );
    if (result.hits[0]) {
      res.send({
        results: [result.hits],
        pagination: {
          offset: finalSet.finalOffset,
          limit: finalSet.finalLimit,
          total: result.nbHits,
        },
      });
    } else {
      res.send({message: "No products found."});
    }
  } catch (error) {
    res.send({message: "The limit parameter must be a number between 1 and 100. "});
  }
}

const handler = methods({
  get: getHandler,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, handler);
};
