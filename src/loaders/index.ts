import Express from "express";
import express from "@src/loaders/express";
import Logger from "@src/loaders/logger";

export default async ({
  expressApp,
}: {
  expressApp: Express.Application;
}): Promise<void> => {
  await express({ app: expressApp });
  Logger.info("✅ Express loaded");

  Logger.info("✅ All modules loaded!");
};
