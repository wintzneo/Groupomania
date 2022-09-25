const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


//Liké le post
exports.addLike = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const addLike = await prisma.likes.create({
      data: {
        user: {
          connect: { id: userId },
        },
        post: {
          connect: {id: postId},
        },
      },
    });
    res.status(200).json({
      status: true,
      message: "post liked",
      data: addLike,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

//Post liké
exports.isLike = async (req, res, next) => {
  try {
    const id = req.user.id;
    const postId = req.params.postId;
    const userLiked = await prisma.likes.findMany({
      where: {
        userId: id,
        postId: postId,
      },
    });
    res.status(200).json({
      status: true,
      message: "User liked",
      data: userLiked,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

//Supprimer like
exports.deleteLike = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;
    const deleteLike = await prisma.likes.delete({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    res.status(200).json({
      status: true,
      message: "Like deleted",
      data: deleteLike,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
