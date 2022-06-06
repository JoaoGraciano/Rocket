const express = require("express");
const { use } = require("../../modules/mailer");

const authMiddleware = require("../middlewares/auth");
const {
  authSchema,
  authCurso,
  authVenda,
  authAluno,
  authLead,
} = require("../validation/uservalidation");

const Project = require("../models/project");
const Task = require("../models/task");
const Cad = require("../models/cadastro");
const Venda = require("../models/venda");
const User = require("../models/user");
const Contato = require("../models/contato");
const Alunos = require("../models/alunos");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const projects = await Cad.find();

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: "Error loading project" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const projects = await User.find();

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: "Error loading project" });
  }
});

router.get("/venda", async (req, res) => {
  try {
    const projects = await Venda.find().populate(["user"]);

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: "Error loading project" });
  }
});

router.get("/contato", async (req, res) => {
  try {
    const projects = await Contato.find();

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: "Error loading project" });
  }
});

router.get("/Cad", async (req, res) => {
  try {
    const projects = await Cad.find();

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: "Error loading project" });
  }
});

router.get("/aluno", async (req, res) => {
  try {
    const projects = await Alunos.find();

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: "Error loading project" });
  }
});

router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(
      "user"
    );

    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: "Error loading project" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, descripton, tasks } = req.body;

    const project = await Project.create({
      title,
      descripton,
      user: req.userId,
    });

    await Promise.all(
      tasks.map(async (task) => {
        const projectTask = new Task({ ...task, project: project._id });

        await projectTask.save();

        project.tasks.push(projectTask);
      })
    );

    await project.save();

    return res.send({ project });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error creating new project" });
  }
});

router.put("/:projectId", async (req, res) => {
  try {
    const { nome, cpf, cidade, idade, curso, valor_total } = req.body;

    const project = await Venda.findByIdAndUpdate(
      req.params.projectId,
      {
        title,
        descripton,
      },
      { new: true }
    );

    project.tasks = [];
    await Venda.remove({ project: project._id });

    await Promise.all(
      tasks.map(async (task) => {
        const projectTask = new Venda({
          ...nome,
          cpf,
          cidade,
          idade,
          curso,
          valor_total: project._id,
        });

        await projectTask.save();

        project.tasks.push(projectTask);
      })
    );

    await project.save();

    return res.send({ project });
  } catch (err) {
    console.log("erro aqui");
    console.log(err);
    return res.status(400).send({ error: "Error creating new project" });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { curso, grau, duracao, valor, descricao } = req.body;

    const project = await Cad.findByIdAndUpdate(
      req.params.projectId,
      {
        curso,
        grau,
        duracao,
        valor,
        descricao,
      },
      { new: true }
    );

    project.tasks = [];
    await Cad.remove({ project: project._id });

    await Promise.all(
      tasks.map(async (task) => {
        const projectTask = new Cad({
          ...curso,
          grau,
          duracao,
          valor,
          descricao: project._id,
        });

        await projectTask.save();

        project.tasks.push(projectTask);
      })
    );

    await project.save();

    return res.send({ project });
  } catch (err) {
    console.log(err);
    console.log("erro aqui2");
    return res.status(400).send({ error: "Error creating new project" });
  }
});

router.put("/updateAlunos/:_id", async (req, res) => {
  try {
    const {
      nome,
      idade,
      cpf,
      telefone,
      endereco,
      email,
      cidade,
      estado,
      cep,
      cursos,
    } = req.body;

    let result = authAluno.validate(req.body);
    console.log(result);

    if (result?.error){
        return res.status(400).send({ error: "Erro ao cadastrar o curso." });
    }

    const project = await Alunos.findOneAndUpdate(
      { _id: req.params._id },
      {
        nome,
        idade,
        cpf,
        telefone,
        endereco,
        email,
        cidade,
        estado,
        cep,
        cursos,
      }
    );
    await project.save();

    return res.send({ project });
  } catch (err) {
    console.log(err);
    console.log("4");
    return res.status(400).send({ error: "Error creating new project" });
  }
});

router.put("/updateUser/:_id", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let result = authSchema.validate(req.body);
    console.log(result);

    if (result?.error) {
      return res.status(422).json(result.error);
    }

    const project = await User.findOneAndUpdate(
      { _id: req.params._id },
      {
        name,
        email,
        password,
      }
    );
    await project.save();

    return res.send({ project });
  } catch (err) {
    console.log(err);
    console.log("4");
    return res.status(400).send({ error: "Error creating new project" });
  }
});

router.put("/lead/:id", async (req, res) => {
  try {
    const { email, nome, telefone, cidade } = req.body;

    let result = authLead.validate(req.body);
    console.log(result);

    if (result?.error) {
      return res.status(422).json(result.error);
    }

    const project = await Contato.findOneAndUpdate(
      { _id: req.params.id },
      {
        email,
        nome,
        telefone,
        cidade,
      }
    );

    await project.save();

    return res.send({ project });
  } catch (err) {
    console.log(err);
    console.log("erro aqui3");
    return res.status(400).send({ error: "Error creating new project" });
  }
});

router.put("/Curso/:_id", async (req, res) => {
  try {
    const { curso, grau, duracao, valor, descricao } = req.body;

    let result = authCurso.validate(req.body);
    console.log(result);

    if (result?.error) {
      return res.status(400).send({ error: "Erro ao cadastrar o curso." });
    }
    const project = await Cad.findOneAndUpdate(
      { _id: req.params._id },
      {
        curso,
        grau,
        duracao,
        valor,
        descricao,
      }
    );
    await project.save();

    return res.send({ project });
  } catch (err) {
    console.log(err);
    console.log("4");
    return res.status(400).send({ error: "Error creating new project" });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    console.log(req.params.id, "11");
    return res.status(200).json();
  } catch (error) {
    return res.status(400).json({ error: "Error deleting contato" });
  }
});

router.delete("/contato/:id", async (req, res) => {
  try {
    await Contato.findByIdAndRemove(req.params.id);
    console.log(req.params.id, "12");
    return res.status(200).json();
  } catch (error) {
    return res.status(400).json({ error: "Error deleting contato" });
  }
});

router.delete("/aluno/:id", async (req, res) => {
  try {
    await Alunos.findByIdAndRemove(req.params.id);
    console.log(req.params.id, "12");
    return res.status(200).json();
  } catch (error) {
    return res.status(400).json({ error: "Error deleting contato" });
  }
});

router.delete("/:cadId", async (req, res) => {
  try {
    await Cad.findByIdAndRemove(req.params.cadId);
    console.log(req.params.cadId, "3");
    return res.status(200).json();
  } catch (error) {
    return res.status(400).json({ error: "Error deleting cadastro" });
  }
});

router.delete("/:venda/:id", async (req, res) => {
  try {
    await Venda.findByIdAndRemove(req.params.id);
    console.log(req.params.id, "2");
    return res.status(200).json();
  } catch (error) {
    return res.status(400).json({ error: "Error deleting venda" });
  }
});



module.exports = (app) => app.use("/projects", router);
