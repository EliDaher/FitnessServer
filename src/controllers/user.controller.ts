import { Request, Response } from "express";
import admin from "../firebase/admin";


export const addWeight = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { weight, username } = req.body;

  if (!weight || !username) {
    return res.status(400).json({ message: 'الوزن والتاريخ مطلوبان' });
  }

  const db = admin.database();
    // التحقق من وجود المستخدم
  const userRef = db.ref(`users/${username}`);
  const snapshot = await userRef.once("value");

  if (!snapshot.exists()) {
    return res.status(400).json({ error: "اسم المستخدم غير موجود" });
  }

  // تحديث الوزن
  await userRef.update({
    weight: weight,
  });

  console.log(`إضافة وزن ${weight} للمستخدم ${userId}`);

  res.status(201).json({
    message: `تمت إضافة الوزن للمستخدم ${userId}`,
    data: { userId, weight, username },
  });
};

export const addheight = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { height, username } = req.body;

  if (!height || !username) {
    return res.status(400).json({ message: 'الطول والتاريخ مطلوبان' });

  }

  const db = admin.database();
    // التحقق من وجود المستخدم
  const userRef = db.ref(`users/${username}`);
  const snapshot = await userRef.once("value");

  if (!snapshot.exists()) {
    return res.status(400).json({ error: "اسم المستخدم غير موجود" });
  }

  // تحديث الوزن
  await userRef.update({
    height: height,
  });

  console.log(`إضافة وزن ${height} للمستخدم ${userId}`);

  res.status(201).json({
    message: `تمت إضافة الوزن للمستخدم ${userId}`,
    data: { userId, height, username },
  });
};


export const addgender = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { gender, username } = req.body;
  console.log('55555555555')

  if (!gender || !username) {
    return res.status(400).json({ message: 'الوزن والتاريخ مطلوبان' });
  }

  const db = admin.database();
    // التحقق من وجود المستخدم
  const userRef = db.ref(`users/${username}`);
  const snapshot = await userRef.once("value");

  if (!snapshot.exists()) {
    return res.status(400).json({ error: "اسم المستخدم غير موجود" });
  }

  // تحديث الوزن
  await userRef.update({
    gender: gender,
  });

  console.log(`إضافة وزن ${gender} للمستخدم ${userId}`);

  res.status(201).json({
    message: `تمت إضافة الوزن للمستخدم ${userId}`,
    data: { userId, gender, username },
  });
};

export const addage = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { age, username } = req.body;

  if (!age || !username) {
    return res.status(400).json({ message: 'الوزن والتاريخ مطلوبان' });
  }

  const db = admin.database();
    // التحقق من وجود المستخدم
  const userRef = db.ref(`users/${username}`);
  const snapshot = await userRef.once("value");

  if (!snapshot.exists()) {
    return res.status(400).json({ error: "اسم المستخدم غير موجود" });
  }

  // تحديث الوزن
  await userRef.update({
    age: age,
  });

  console.log(`إضافة وزن ${age} للمستخدم ${userId}`);

  res.status(201).json({
    message: `تمت إضافة الوزن للمستخدم ${userId}`,
    data: { userId, age, username },
  });
};