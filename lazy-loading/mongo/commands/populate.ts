import { createConnection } from "typeorm";
import { Product } from "../src/entity/product.entity";
import faker from "faker";

createConnection().then(async conn => {
  const productRepository = conn.getMongoRepository(Product);

  for (let i = 0; i < 50; i++) {
    await productRepository.save({
      title: faker.lorem.words(2),
      description: faker.lorem.words(10),
      image: faker.image.imageUrl(),
      price: faker.datatype.number(100),
    });
  }

  process.exit();
});
