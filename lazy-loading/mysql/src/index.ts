import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { Product } from "./entity/product.entity";

createConnection().then(async conn => {
  const productRepository = conn.getRepository(Product);
  const app = express();
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/products", async (req, res) => {
    const products = await productRepository.find();
    res.json(products);
  });

  app.get("/api/products/backend", async (req, res) => {
    const builder = productRepository.createQueryBuilder();
    let { s, sort, page } = req.query;

    if (s) builder.where("title LIKE :s OR description LIKE :s", { s: `%${s}` });

    // price로 정렬
    if (sort) builder.orderBy("price", <any>sort.toString().toUpperCase());

    const paging = parseInt(<any>page) || 1;
    const perPage = 9;
    const offset = (paging - 1) * perPage; // 시작점
    const total = await builder.getCount();

    builder.offset(offset).limit(perPage);

    res.json({
      data: await builder.getMany(),
      total,
      page,
      last_page: Math.ceil(total / perPage),
    });
  });

  app.listen(9000, () => {
    console.log(`Listening to port 9000`);
  });
});
