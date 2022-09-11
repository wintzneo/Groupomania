const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Like
exports.addLike = async (req, res, next) => {
  try {
    const {postId} = req.params;
    const userId = req.user.id;
    const addLike = await prisma.likes.create({
      data: {
        user: {
          connect: { id: userId },
        },
        post: {
          connect: {id: Number(postId)},
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

// IS LIKE

exports.isLike = async (req, res, nex) => {
  try {
    const id = req.user.id;
    const postId = req.params.postId;
    const userLiked = await prisma.likes.findMany({
      where: {
        userId: Number(id),
        postId: Number(postId),
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

// DELETE LIKE

exports.deleteLike = async (req, res, next) => {
  try {
    let id = req.params.id;
    const deleteLike = await prisma.likes.delete({
      where: {
        id: Number(id),
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