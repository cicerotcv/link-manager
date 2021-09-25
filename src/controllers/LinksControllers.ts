import { Request, Response } from "express";
import { createCode, makeError } from "../helpers";
import { ShortLink } from "../models/Link";
import { User } from "../models/User";

class LinksController {
  async GetMyLinks(req: Request, res: Response) {
    try {
      const { _id } = req;
      const links = await ShortLink.find({ user: _id }).select(
        "-user -updatedAt"
      );

      return res.json([
        ...links.map((link) => ({ ...link.toJSON({ virtuals: true }) }))
      ]);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async CreateLink(req: Request, res: Response) {
    try {
      const { _id } = req;
      const { link } = req.body;

      const user = await User.findOne({ _id });

      if (!user) {
        return res.status(400).json(makeError("User does not exist"));
      }

      const linkAlreadyExists = await ShortLink.findOne({ user: _id, link });
      if (linkAlreadyExists) {
        return res.status(400).json({ error: "Link already exists" });
      }

      let shortCode, shortCodeAlreadyExists;
      let done = false;

      while (!done) {
        shortCode = createCode();
        shortCodeAlreadyExists = await ShortLink.findOne({
          user: _id,
          shortCode
        });
        done = !shortCodeAlreadyExists;
      }

      const shortened = await ShortLink.create({
        user: _id,
        link,
        prefix: user.username,
        shortCode
      });

      return res.json({ ...shortened.toJSON(), full: shortened.full });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
}

export const linksController = new LinksController();
