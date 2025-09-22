import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { heroRouter } from "./modules/hero/hero.routes";
import { ministryRouter } from "./modules/ministries/ministry.routes";
import { sermonRouter } from "./modules/sermon/sermon.routes";
import { itemTagRouter } from "./modules/itemTag/itemTag.routes";
import { galleryRouter } from "./modules/gallery/gallery.routes";
import { aboutRouter } from "./modules/about/about.routes";
import { pastorRouter } from "./modules/pastor/pastor.routes";
import { contactInfoRouter } from "./modules/contact/contact.routes";
import { socialLinkRouter } from "./modules/social/social.routes";
import { ctaRouter } from "./modules/cta/cta.routes";
import { siteLinkRouter } from "./modules/siteLinks/siteLink.routes";
import { footerRouter } from "./modules/footer/footer.routes";
import { statisticsRouter } from "./modules/statistics/statistics.routes";
import { beliefRouter } from "./modules/belief/belief.routes";
import { growInFaithRouter } from "./modules/growInFaith/growInFaith.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { authenticationMiddleware } from "./middlewares/auth.middleware";
import { eventRouter } from "./modules/event/event.routes";
import { configEntityRouter } from "./modules/config/config.routes";
import { userRouter } from "./modules/user/user.routes";
import { publicRouter } from "./modules/public/public-content.routes";
import { paymentOptionRouter } from "./modules/payment/paymentOption.routes";
import liveRouter from "./modules/live/live.routes";
import { scheduledProgramRouter } from "./modules/scheduledPrograms/scheduledProgram.routes";
import { dropdownListRouter } from "./modules/dropdownList/dropdownList.routes";
import fileStorageRouter from "./modules/fileStorage/fileStorage.router";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    ...process.env.ADMIN_FRONTEND_ENDPOINT!.split(","),
    process.env.WEBSITE_FRONTEND_ENDPOINT!
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/admin', authenticationMiddleware);

// Routes
app.get("/api", (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: "Welcome to our API" })
})
app.use("/api/admin/hero", heroRouter);
app.use("/api/admin/ministry", ministryRouter);
app.use("/api/admin/sermons", sermonRouter);
app.use("/api/admin/item-tag", itemTagRouter);
app.use("/api/admin/gallery", galleryRouter);
app.use("/api/admin/about", aboutRouter);
app.use("/api/admin/pastors", pastorRouter);
app.use("/api/admin/contact", contactInfoRouter);
app.use("/api/admin/social", socialLinkRouter);
app.use("/api/admin/cta", ctaRouter);
app.use("/api/admin/site-links", siteLinkRouter);
app.use("/api/admin/footer", footerRouter);
app.use("/api/admin/statistics", statisticsRouter);
app.use("/api/admin/beliefs", beliefRouter);
app.use("/api/admin/grow-in-faith", growInFaithRouter);
app.use("/api/admin/events", eventRouter);
app.use("/api/admin/config-entities", configEntityRouter);
app.use("/api/admin/users", userRouter);
app.use("/api/admin/payment-options", paymentOptionRouter);
app.use("/api/admin/watch-live", liveRouter);
app.use("/api/admin/scheduled-program", scheduledProgramRouter);
app.use("/api/admin/dropdown-list", dropdownListRouter);
app.use('/api/admin/file-storage', fileStorageRouter);

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/public', publicRouter)

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found!" })
})

// Error Handler
app.use(errorHandler);

export default app;
