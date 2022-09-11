//Package file system pour modifier le système de donnée pour la fonction delete
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


//Création d'un post
exports.create = async (req, res, next) => {
  try {
    const { title, content, imageAltText } = req.body;
    const userId = req.user.id;
    const data = {
      title,
      content,
      user: {
        connect: { id: userId },
      }
    };
    if ( req.file) {
      data.image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      data.imageAltText = imageAltText;
    }
    const post = await prisma.post.create({
      data, 
    });
    res.status(200).json({
      status: true,
      message: "Post created !",
      data: post,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

//Récupération de tout les postes
exports.list = async (req, res, next) => {
  try {
    const list = await prisma.post.findMany({
      select: {
        id: true,
        title: true, 
        content: true,
        image: true,
        createAt: true,
        userId: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        }
      },
      orderBy: {
        createAt: "desc",
      },
    });
    res.status(200).json({
      status: true,
      message: "All Posts",
      data: list,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};


//Récupère un poste unique par l'id
exports.OnePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const OnePost = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        commentaire: {
          orderBy: {
            createAt: "desc",
          },
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },
        likes: true,
      },
    });
    if (!OnePost) {
      return res.status(404).json({
        message: "not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "One post",
      data: OnePost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

//Supprimer un post
exports.delete = async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });
  if (!post) {
    return res.status(404).json({
      message: "not found",
    });
  }
  if (req.user.isAdmin === 1 || post.userId === req.user.id) {
    const image = req.body.image;
    const filename = String(image).split("/image/")[1];
    fs.unlink(`image/${filename}`, async () => {
      try {
        const post = await prisma.post.delete({
          where: {
            id: Number(req.params.id),
          },
        });
        res.status(200).json({
          status: true,
          message: "Post deleted !",
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  } else {
    res.status(403).json({message: "pas autorisé"})
  }
};