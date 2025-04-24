import { Request, Response } from "express";
import admin from "../firebase/admin";

// ✅ تسجيل مستخدم جديد
export const signup = async (req: Request, res: Response) => {
  const { fullName, username, email, password, confirmPassword } = req.body;

  if (!fullName || !username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const db = admin.database();

    // التحقق من وجود اسم المستخدم مسبقًا
    const usernameSnapshot = await db.ref(`users/${username}`).once("value");
    if (usernameSnapshot.exists()) {
      console.log('username already taken')
      return res.status(400).json({ error: "Username already taken" });
    }

    // إنشاء بيانات المستخدم
    const userData = {
      fullName,
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    // حفظ المستخدم في قاعدة البيانات
    await db.ref(`users/${username}`).set(userData);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Server error during signup" });
  }
};

// ✅ تسجيل الدخول
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    console.log(username + "5555" + password)
    // جلب بيانات المستخدم
    const snapshot = await admin.database().ref(`users/${username}`).once("value");
    const userData = snapshot.val();

    console.log('hui55555555')
    if (!userData) {
      console.log('userDate')
      return res.status(404).json({ error: "User not found." });
    }
    
    // مقارنة كلمة السر (بسيطة)
    if (userData.password !== password) {
      console.log('userPassword')
      return res.status(401).json({ error: "Incorrect password." });
    }

    console.log('hui')

    return res.status(200).json({
      message: "Login successful",
      fullName: userData.fullName,
      username: userData.username,
    });

  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error during login" });
  }
};
