const { PrismaClient } = require("@prisma/client");

const router = require("express").Router();

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({});
    res.json(products);
  } catch {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    });
    res.json(product);
  } catch {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.json("Your Product Deleted Successfully");
  } catch {
    next(error);
  }
});
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(updateProduct);
  } catch {
    next(error);
  }
});

module.exports = router;
