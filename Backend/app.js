import express from "express";
import passport from "passport";
import { Strategy } from "passport-openidconnect";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./database/init.js";
import { User } from "./database/init.js";

// 1. Connect to MongoDB
await connectDB();

// 2. Configure Passport
passport.use(
  new Strategy(
    {
      issuer: process.env.OIDC_ISSUER,
      authorizationURL: `${process.env.OIDC_ISSUER}/authorize`,
      tokenURL: `${process.env.OIDC_ISSUER}/oauth/token`,
      userInfoURL: `${process.env.OIDC_ISSUER}/userinfo`,
      clientID: process.env.OIDC_CLIENT_ID,
      clientSecret: process.env.OIDC_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/callback",
    },
    async (issuer, profile, done) => {
      const user = {
        id: profile?.id || profile?.sub,
        email: profile?.emails?.[0]?.value,
        sub: profile?.sub,
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user?.sub);
});

passport.deserializeUser(async (sub, done) => {
  let user = await User.findById(sub);
  if (!user) {
    user = new User({ _id: sub, email: '' });
    await user.save();
  }
  done(null, user);
});

// 3. Initialize Express
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize()) 
app.use(passport.session()) 
app.use(express.json()) 



// 4. Auth routes
app.get("/auth/login", passport.authenticate("openidconnect"));
app.get("/auth/callback",
  passport.authenticate("openidconnect", { failureRedirect: "/login" }),
  (req, res) => res.redirect("http://localhost:5173/")
);
app.get("/auth/logout", (req, res) => {
  req.logout(function (err) {
    if (err) { return res.status(500).json({ message: "Error logging out" }); }
    res.redirect("http://localhost:5173/");
  });
});

// 5. API routes
app.get("/api/profile", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

  let profile = await User.findById(req.user?.sub);
  if (!profile) {
    profile = new User({ _id: req.user?.sub, email: req?.user?.email });
    await profile.save();
  }
  res.json(profile);
});

// Update profile
app.put("/api/profile", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });

  const { firstName, lastName, phoneNumber, city, pincode } = req.body;

  let profile = await User.findById(req?.user?.sub);
  if (!profile) {
    profile = new User({ _id: req?.user?.sub, email: req?.user?.email });
  }
  Object.assign(profile, { firstName, lastName, phoneNumber, city, pincode });
  await profile.save();

  res.json(profile);
});

// 6. Start the server
app.listen(process.env.PORT, () => {
  console.log(`🚀Server listening on port ${process.env.PORT}`);
});
