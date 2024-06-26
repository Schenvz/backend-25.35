import { Router } from "express";

import { orders } from "../../data/mongo/manager.mongo.js";

import passCallBack from "../../middlewares/passCallBack.mid.js";

const ordersRouter = Router();

ordersRouter.post("/", passCallBack("jwt"), async (req, res, next) => {
  try {
    const data = {
      user_id: req.user._id,
      event_id: req.body.event_id,
    };
    console.log(data);
    const one = await orders.create(data);
    return res.json({
      statusCode: 201,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/bills/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const report = await orders.reportBill(uid);
    return res.json({
      statusCode: 200,
      response: report,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }
    const all = await orders.read({ filter });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body;
    const one = await orders.update(oid, data);
    return res.json({
      statusCode: 200,
      message: "updated!",
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await orders.destroy(oid);
    return res.json({
      statusCode: 200,
      message: "deleted!",
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
