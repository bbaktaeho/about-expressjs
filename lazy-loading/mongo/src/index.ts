import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { Product } from "./entity/product.entity";

createConnection().then(conn => {
  const productRepository = conn.getMongoRepository(Product);
  const app = express();
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/products", async (req, res, next) => {
    const products = await productRepository.find();
    res.json(products);
  });

  app.get("/api/products/backend", async (req, res, next) => {
    let options = {};

    if (req.query.s) {
      options = {
        ...options,
        where: {
          $or: [
            // 제목과 내용으로 검색
            {
              title: new RegExp(req.query.s.toString(), "i"), // i플래그는 대소문자 구분 없이 검색함
              description: new RegExp(req.query.s.toString(), "i"),
            },
          ],
        },
      };
    }
    if (req.query.sort) {
      options = {
        ...options,
        order: {
          // 정렬 수행 (asc, desc)
          price: req.query.sort.toString().toUpperCase(),
        },
      };
    }
    const page: number = parseInt(req.query.page as any) || 1; // 없으면 1페이지
    const take = 9;
    const total = await productRepository.count();
    console.log(page, (page - 1) * take);

    const data = await productRepository.find({
      ...options,
      take, // take만큼 조회
      skip: (page - 1) * take, // 데이터의 시작점을 정해서 그 전 데이터는 스킵됨
    });
    res.json({ data, total, page, last_page: Math.ceil(total / take) });
  });

  app.listen(9000, () => {
    console.log(`Listening to port 9000`);
  });
});
