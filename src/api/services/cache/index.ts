import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Story } from "../hackernews/types";

const alreadyCreatedAps = getApps();

if (alreadyCreatedAps.length === 0) {
  initializeApp({
    credential: cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
}

const db = getFirestore();

export async function createStory(story: Story) {
  const docRef = db.collection("summary").doc(story.id.toString());
  const doc = await docRef.get();

  if (doc.exists) return;

  try {
    const createdStory = await db
      .collection("summary")
      .doc(story.id.toString())
      .set(story);

    console.log("Story created", createdStory);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
