const { PrismaClient } = require("@prisma/client");

const router = require("express").Router();

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const carts = await prisma.cart.findMany({
      include: {
        product: true,
      },
    });
    res.json(carts);
  } catch {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { productId, userId, quantity } = req.body;

    // Check if the cart item already exists for the given product and user
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        productId: productId,
        userId: userId,
      },
    });

    if (existingCartItem) {
      // If the cart item already exists, update the quantity
      const updatedCartItem = await prisma.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });

      res.json(updatedCartItem);
    } else {
      // If the cart item doesn't exist, create a new one
      const newCartItem = await prisma.cart.create({
        data: {
          productId: productId,
          userId: userId,
          quantity: quantity,
        },
      });

      res.json(newCartItem);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/user/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const carts = await prisma.cart.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        product: true,
      },
    });
    res.json(carts);
  } catch {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const categories = await prisma.category.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        products: true,
      },
    });
    res.json(categories);
  } catch {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const updateCart = await prisma.cart.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(updateCart);
  } catch {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCart = await prisma.cart.delete({
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
