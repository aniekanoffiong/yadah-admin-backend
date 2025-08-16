import express from "express";
import cors from "cors";
import "express-async-errors";
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

const app = express();

app.use(cors());
app.use(express.json());
app.use('/admin', authenticationMiddleware);

// Routes
app.use("/admin/hero", heroRouter);
app.use("/admin/ministry", ministryRouter);
app.use("/admin/sermon", sermonRouter);
app.use("/admin/item-tag", itemTagRouter);
app.use("/admin/gallery", galleryRouter);
app.use("/admin/about", aboutRouter);
app.use("/admin/pastor", pastorRouter);
app.use("/admin/contact", contactInfoRouter);
app.use("/admin/social", socialLinkRouter);
app.use("/admin/cta", ctaRouter);
app.use("/admin/site-link", siteLinkRouter);
app.use("/admin/footer", footerRouter);
app.use("/admin/statistics", statisticsRouter);
app.use("/admin/belief", beliefRouter);
app.use("/admin/grow-in-faith", growInFaithRouter);
app.use("/admin/event", eventRouter);

app.use("/auth", authRouter);

// Error Handler
app.use(errorHandler);

export default app;
