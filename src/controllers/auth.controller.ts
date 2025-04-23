import { Request, Response } from "express";
import admin from "../firebase/admin";

export const signup = async (req: Request, res: Response) => {
  const { fullName, username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    const db = admin.database();
    await db.ref(`users/${user.uid}`).set({
      fullName,
      username,
      email,
      password,
      createdAt: Date.now(),
    });

    return res.status(201).json({ uid: user.uid });
  } catch (error: any) {
    console.log(error)
    return res.status(400).json({ error: error.message });
  }
};

// دالة التحقق من التوكن
export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return res.status(200).json({ uid: decoded.uid, email: decoded.email });
  } catch (error: any) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ✅ تسجيل الدخول
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // جلب المستخدم من Firebase
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    // جلب بيانات المستخدم من Realtime Database
    const snapshot = await admin.database().ref(`users/${uid}`).once("value");
    const userData = snapshot.val();

    if (!userData) {
      return res.status(404).json({ error: "User data not found." });
    }

    // التحقق من كلمة السر (مقارنة بسيطة)
    if (userData.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // إنشاء JWT (token) باستخدام Firebase
    const customToken = await admin.auth().createCustomToken(uid);

    return res.status(200).json({
      message: "Login successful",
      uid,
      fullName: userData.fullName,
      username: userData.username,
      token: customToken,
    });

  } catch (error: any) {
    console.error("Login error:", error.code, error.message, error.stack);
    return res.status(500).json({ error: error.message });
  }
};