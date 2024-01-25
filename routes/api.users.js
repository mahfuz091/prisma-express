const { PrismaClient } = require("@prisma/client");

const router = require("express").Router();

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        products: true,
        Cart: true,
      },
    });
    res.json(users);
  } catch {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.json(user);
  } catch {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        products: true,
        Cart: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(user);
  } catch {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updateCategory = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(updateCategory);
  } catch {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCategory = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.json("Your Category Deleted Successfully");
  } catch {
    next(error);
  }
});

module.exports = router;
